import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import document from "document";
import userActivity from "user-activity";

import { HeartRateSensor } from "heart-rate";

// Create a new instance of the HeartRateSensor object
let hrm = new HeartRateSensor();

hrm.onreading = function() {

  // Peek the current sensor values
  console.log("Current heart rate: " + hrm.heartRate);

  // Stop monitoring the sensor
  hrm.stop();
}

// Begin monitoring the sensor
hrm.start();

let myClock = document.getElementById("myClock");

clock.granularity = "minutes"; // seconds, minutes, hours

clock.ontick = function(evt) {
  myClock.text = ("0" + evt.date.getHours()).slice(-2) + ":" +
                      ("0" + evt.date.getMinutes()).slice(-2);
};


// Pull Goals
const distanceGoal = userActivity.goals.distance;
const caloriesGoal = userActivity.goals["calories"];
//const stepsGoal = userActivity.goals.steps;
const stepsGoal = 5000;
const growthFactor = Math.floor(stepsGoal / 185); // One pixel growth per growth factor
const elevationGoal = userActivity.goals.elevationGain;
const activeGoal = userActivity.goals.activeMinutes;

// Pull Flower Parts
var stem = document.getElementById("stem");
var pistil = document.getElementById("pistil");
var petal1 = document.getElementById("petal1");
var petal2 = document.getElementById("petal2");
var petal3 = document.getElementById("petal3");
var petal4 = document.getElementById("petal4");
var petal5 = document.getElementById("petal5");
var petal6 = document.getElementById("petal6");
var petal7 = document.getElementById("petal7");
var petal8 = document.getElementById("petal8");
var stemDone = false;
var pistilDone = false;

let dailysteps = document.getElementById("mySteps");
//let startCount = userActivity.today.adjusted["steps"] || 0;
let startCount = 0;

var amountSteps = 1;

function growStem() {
    if (stem.height < 125) {
      stem.height += 1;
      stem.y -= 1;
    } else {
      stemDone = true;
    }
}

function growPistil() {
  if (stemDone) {
    if (pistil.r < 25) {
      pistil.r += 1;
    } else {
      pistilDone = true;
    }
  }
}

function growPetals() {
  if (pistilDone) {
    if (petal1.r < 35) {
      petal1.r += 1;
      petal2.r += 1;
      petal3.r += 1;
      petal4.r += 1;
    }
  if (petal5.r < 40) {
      petal5.r += 1;
      petal6.r += 1;
      petal7.r += 1;
      petal8.r += 1;
    }
  }
}


function updateStats() {
  const metricSteps = "steps";  // distance, calories, elevationGain, activeMinutes
  //const amountSteps = userActivity.today.adjusted[metricSteps] || 0;
  //amountSteps += 280;
  amountSteps += 1;
  const metricCals = "calories";  // distance, calories, elevationGain, activeMinutes
  const amountCals = userActivity.today.adjusted[metricCals] || 0;
  const metricActive = "activeMinutes";
  const amountActive = userActivity.today.adjusted[metricActive] || 0;
  const metricElevation = "elevationGain";
  const amountElevation = userActivity.today.adjusted[metricElevation] || 0;
  
  dailysteps.text = amountSteps;
  var percentToGoal = (amountSteps / stepsGoal) * 100;
  
  if (amountSteps % growthFactor == 0) {
    growStem();
    growPistil();
    growPetals();
  }
  
}

//setInterval(growStem, 10);
//setInterval(growPistil, 10);
//setInterval(growPetals, 10);
setInterval(updateStats, 2);
//setInterval(orbit, 5);
// Animate after a 5 second delay



