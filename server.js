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

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true
    });

app.get('/exercise', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/exercise.html'));
});

app.get('/stats', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/stats.html'));
});

app.get("/api/workouts", (req, res) => {
    //.aggregate() allows you to 
    db.Workout.aggregate([{
        //addFields allows you to create a new field - "totalDuration"
        $addFields: {
            totalDuration: {
                $sum: '$exercises.duration'
            }
        }
    }])
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

app.get("/api/workouts/range", (req, res) => {
    //.aggregate() allows you to 
    db.Workout.aggregate([{
        //addFields allows you to create a new field - "totalDuration"
        $addFields: {
            totalDuration: {
                $sum: '$exercises.duration'
            }
        }
    }])
        //sort descending order
        .sort({ _id: -1})
        //list last 7
        .limit(7)
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
    db.Workout.findOneAndUpdate({ _id: req.params.id }, { $push: { exercises: req.body } }, { new: false })
        //what is this actually doing? 
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        })
});

// app.get("/stats", (req, res) => {
//     db.Workout.find({})
//         // console.log(res.body)
//         .then(dbWorkout => {
//             res.json(dbWorkout);
//         })
//         .catch(err => {
//             res.json(err);
//         });
// });

// Start the server
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});