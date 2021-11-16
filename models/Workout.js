
//Workouts include date and exercises
//Exercises: Types:  Resistance & Cardio
//Resistance keys: (from Seed.js)
// date: new Date(new Date().setDate(new Date().getDate() - 9)),
// exercises: [
//     {
//       type: 'resistance',
//       name: 'Bicep Curl',
//       duration: 20,
//       weight: 100,
//       reps: 10,
//       sets: 4,
//     },
//   ],
//
// exercises: [
//     {
//       type: 'cardio',
//       name: 'Running',
//       duration: 25,
//       distance: 4,
//     },
//   ],
//Workout: calulated fields - method to add?
// totalDuration: "Total Workout Duration",
// numExercises: "Exercises Performed",
// totalWeight: "Total Weight Lifted",
// totalSets: "Total Sets Performed",
// totalReps: "Total Reps Performed",
// totalDistance: "Total Distance Covered"

//Add New Workout
//Complete Workout - probably need a true/false entry for completed.
//On complete, calculate totalFields above and add to completed record. Implies we should create those as fields in a workout record.
//Stats then pulls from last 7 workouts and aggregates the total. But how does that get rendered? 

//Process:
//Build model for workout collection (what is the db called dburl?)
//Seed db with seed file
//Add a get/all route to pull back data from workouts

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [
        {
            type: {
                type: String
            },

            name: {
                type: String
            },

            duration: {
                type: Number
            },

            weight: {
                type: Number
            },

            sets: {
                type: Number
            },

            reps: {
                type: Number
            },

            distance: {
                type: Number
            },
        }
    ],
    isComplete: {
        type: Boolean
    }
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;