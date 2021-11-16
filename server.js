const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require('path');

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

app.get('/exercise', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/exercise.html'));
});

app.get('/stats', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/stats.html'));
});

app.get("/api/workouts", (req, res) => {

    db.Workout.find({})

        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});


//current status: this is adding an empty array. When it does this last workout does not get fetched correctly
app.post("/api/workouts", (req, res) => {
    db.Workout.create(req.body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

//add exercise to workout
app.put("/api/workouts/:id", (req, res) => {
    db.Workout.findOneAndUpdate({_id:req.params.id}, { $push: { exercises: req.body } }, { new: true })
    .then(dbWorkout => {
      console.log(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    })
    // console.log(req.body);
    // res.json(req.body)
    // db.Workout.findByIdAndUpdate({"_id": "req.params.id"},{$push:{exercises: req.body}})
    // .then(()=>{
    //     console.log(req.body)
    // })
    // .catch(err => {
    //     res.json(err);
    // });
    // console.log(req.body)
    // db.Workout.findByIdAndUpdate(req.body)
    //     .then(({ _id }) => db.Workout.findOneAndUpdate({}, { $push: { workouts: _id } }, { new: true }))
    //     .then(dbWorkout => {
    //         res.json(dbWorkout);
    //     })
    //     .catch(err => {
    //         res.json(err);
    //     });
});

  app.get("/stats", (req, res) => {
    db.Workout.find({})
    // console.log(res.body)
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

// Start the server
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});