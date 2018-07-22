import clock from "clock";
import document from "document";
import userActivity from "user-activity";
import { HeartRateSensor } from "heart-rate";
import { locale } from "user-settings";
import { preferences } from "user-settings";
import * as messaging from "messaging";
import * as fs from "fs";
import { me as device } from "device";

import * as util from "../common/utils";

// Update the clock every minute
clock.granularity = "seconds";
const clockPref = preferences.clockDisplay;
let lastValueTimestamp = Date.now();

try {
  let stats = fs.statSync("theme.txt");
  let json_themeread = fs.readFileSync("theme.txt", "json");
} catch (err) {
  let json_theme = {"backg": "#f8fcf8", "foreg": "#707070"};
  fs.writeFileSync("theme.txt", json_theme, "json");
  let json_themeread = fs.readFileSync("theme.txt", "json");
}

if (!device.screen) device.screen = { width: 348, height: 250 };

let backgdcol = json_themeread.backg || "#f8fcf8";
let foregdcol = json_themeread.foreg || "#707070";

// Get Goals to reach
const distanceGoal = userActivity.goals.distance;
const caloriesGoal = userActivity.goals["calories"];
const stepsGoal = userActivity.goals.steps;
const elevationGoal = userActivity.goals.elevationGain;
const activeGoal = userActivity.goals.activeMinutes;

// Get a handle on the <text> element
let myClock = document.getElementById("myLabel");
let myDate = document.getElementById("myDate");
let dailysteps = document.getElementById("mySteps");
let comment = document.getElementById("comment");
let img = document.getElementById("testing");
// let toggle = document.getElementById('btn-toggle');
// let startCount = userActivity.today.adjusted["steps"] || 0;
let startCount = 0;
let amountSteps = 0;
console.log(stepsGoal);

// toggle.addEventListener('click', (evt) => {
//   console.log('Shubham');
//   img.href = "10.png";
// });

function applyTheme(background, foreground) {
  myClock.style.fill = background;
  dailysteps.style.fill = background;
}


function updateStats() {
  const metricSteps = "steps";  // distance, calories, elevationGain, activeMinutes
  // const amountSteps = userActivity.today.adjusted[metricSteps] || 0;
  const metricCals = "calories";  // distance, calories, elevationGain, activeMinutes
  const amountCals = userActivity.today.adjusted[metricCals] || 0;
  const metricActive = "activeMinutes";
  const amountActive = userActivity.today.adjusted[metricActive] || 0;
  const metricElevation = "elevationGain";
  const amountElevation = userActivity.today.adjusted[metricElevation] || 0;
  const goal = 5000;
  const map  = {0: "Lets get started!", 1: "Keep it up!", 2: "Keep it up!", 3: "Keep it up!", 4: "Keep it up!", 5: "You are halfway there!", 6: "Not much left now!", 7: "You are doing great!", 8: "You are doing great!", 9: "Final Stretch!", 10: "You've done it!"};

  amountSteps += Math.floor((Math.random() * 500) + 1);
  dailysteps.text = amountSteps;
  let fileNum = Math.floor(((amountSteps - startCount)/goal) * 10)
  if(fileNum < 10) {
    img.href = (fileNum).toString() + ".png";
    comment.text = map[fileNum];
  }  else {
    img.href = "10.png";
    comment.text = map[10];
  }
}

// Update the <text> element with the current time
function updateClock() {
  let lang = locale.language;
  let today = new Date();
  let day = util.zeroPad(today.getDate());
  let wday = today.getDay();
  let month = util.zeroPad(today.getMonth()+1);
  let year = today.getFullYear();
  let hours = util.zeroPad(util.formatHour(today.getHours(), clockPref));
  let mins = util.zeroPad(today.getMinutes());
  let prefix = lang.substring(0,2);
  if ( typeof util.weekday[prefix] === 'undefined' ) {
    prefix = 'en';
  }
  let divide = "/";
  if ( prefix == 'de' ) {
    divide = ".";
  } else if ( prefix == "nl" || prefix == "ko") {
    divide = "-"
  }
  let datestring = day + divide + month + divide + year;
  if ( prefix == "en" ) {
    datestring = month + divide + day + divide + year;
  } else if ( prefix == "zh" || prefix == "ja" || prefix == "ko") {
    datestring = year + divide + month + divide + day;
  }
  myClock.text = `${hours}:${mins}`; 
  myDate.text = `${util.weekday[prefix][wday]}, ${datestring}`;
  updateStats();
}

function setBattery(){
  let batteryLevelLabel = document.getElementById("batteryLevelLabel");
  let batteryLevelRect = document.getElementById("batteryLevelRect");
  let batteryLevelImage = document.getElementById("batteryLevelImage");

}


// Update the clock every tick event
clock.ontick = () => updateClock();

// Don't start with a blank screen
applyTheme(backgdcol, foregdcol);
updateClock();
setBattery();
