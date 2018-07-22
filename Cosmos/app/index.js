import clock from "clock";
import document from "document";
import userActivity from "user-activity";
import { HeartRateSensor } from "heart-rate";
import { locale } from "user-settings";
import { preferences } from "user-settings";
import * as messaging from "messaging";
import * as fs from "fs";
import { me as device } from "device";

var layerObjects = [];
var layerOrder = [1,2,3];
var nameArray1 = ["Aries","Taurus","Gemini","Cancer"];
var nameArray2 =["Leo","Virgo","Libra","Scorpio"];
var nameArray3 =["Sagittarius","Capricorn","Aquarius","Pisces"]


const distanceGoal = userActivity.goals.distance;
const caloriesGoal = userActivity.goals["calories"];
//const stepsGoal = userActivity.goals.steps;
const stepsGoal = 5000;
const growthFactor = Math.floor(stepsGoal / 185); // One pixel growth per growth factor
const elevationGoal = userActivity.goals.elevationGain;
const activeGoal = userActivity.goals.activeMinutes;


let dailysteps = document.getElementById("mySteps");
//let startCount = userActivity.today.adjusted["steps"] || 0;
let startCount = 0;

var amountSteps = 1;
var isRunFirst = false;
var isRunSecond = false;
var isRunThird = false;


let myClock = document.getElementById("myClock");

clock.granularity = "minutes"; // seconds, minutes, hours

clock.ontick = function(evt) {
  myClock.text = ("0" + evt.date.getHours()).slice(-2) + ":" +
                      ("0" + evt.date.getMinutes()).slice(-2);
};

var LayerObjectsConst = function (name, layerNumber, filePath){
  this.name = name;
  this.layerNumber = layerNumber;
  this.filePath = this.name +".png";
  layerObjects.push(this);
};
// // loops through names and makes an object for each one

function populatelayerObjects() {
  
  for (var i = 0; i < 4; i++) {
      //  console.log("loop =",j)
      new LayerObjectsConst(nameArray1[i], 1);
      }; // end suits loop
  for (var j = 0; j < 4; j++) {
      //  console.log("loop =",j)
      new LayerObjectsConst(nameArray2[j], 2);
      }; // end suits loop
  for (var k = 0; k < 4; k++) {
      //  console.log("loop =",j)
      new LayerObjectsConst(nameArray3[k], 3);
      }; // end suits loop


}; // end function populateCards
populatelayerObjects();


function drawFirst(){
  
  let firstLayer1 = document.getElementById("firstLayer1");
  let firstLayer2 = document.getElementById("firstLayer2");
  let firstLayer3 = document.getElementById("firstLayer3");
  let firstLayer4 = document.getElementById("firstLayer4");
  
  firstLayer1.animate("load");
  firstLayer2.animate("load");
  firstLayer3.animate("load");
  firstLayer4.animate("load");
  
  firstLayer1.href = "firstLayer1.png";
  firstLayer2.href = "firstLayer2.png";
  firstLayer3.href = "firstLayer3.png";
  firstLayer4.href = "firstLayer4.png";
  
};



function drawSecond(){
   let secondLayer1 = document.getElementById("secondLayer1");
  let secondLayer2 = document.getElementById("secondLayer2");
  let secondLayer3 = document.getElementById("secondLayer3");
  let secondLayer4 = document.getElementById("secondLayer4");
  
  secondLayer1.animate("load");
  secondLayer2.animate("load");
  secondLayer3.animate("load");
  secondLayer4.animate("load");
  
  secondLayer1.href = "secondLayer1.png";
  secondLayer2.href = "secondLayer2.png";
  secondLayer3.href = "secondLayer3.png";
  secondLayer4.href = "secondLayer4.png";
  
};



function drawThird(){
  let thirdLayer1 = document.getElementById("thirdLayer1");
thirdLayer1.href = "thirdLayer1.png";

// let thirdLayer2 = document.getElementById("thirdLayer2");
// thirdLayer2.href = "thirdLayer2.png";
  
let thirdLayer3 = document.getElementById("thirdLayer3");
thirdLayer3.href = "thirdLayer3.png";

let thirdLayer4 = document.getElementById("thirdLayer4");
thirdLayer4.href = "thirdLayer4.png";
  
  thirdLayer1.animate("load");
  // thirdLayer2.animate("load");
  thirdLayer3.animate("load");
  thirdLayer4.animate("load");
  
  thirdLayer1.href = "thirdLayer1.png";
  // thirdLayer2.href = "thirdLayer2.png";
  thirdLayer3.href = "thirdLayer3.png";
  thirdLayer4.href = "thirdLayer4.png";
};

let thirdLayer2 = document.getElementById("thirdLayer2");
thirdLayer2.href = "thirdLayer2.png";



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
  

if (amountSteps >100 && !isRunFirst){
  drawFirst();
  isRunFirst = true;
};

if(amountSteps > 300 && !isRunSecond){

  drawSecond();
  isRunSecond = true;
};

if(amountSteps > 1000 && !isRunThird){
  drawThird();
  isRunThird = true;
}

  
}
setInterval(updateStats, 2);



// Get a handle on the instance
// var demoinstance1 = document.getElementById("firstLayer1");
// var demoinstance2 = document.getElementById("firstLayer2");
// var demoinstance3 = document.getElementById("firstLayer3");
// var demoinstance4 = document.getElementById("firstLayer4");

var demoinstance5 = document.getElementById("secondLayer1");
var demoinstance6 = document.getElementById("secondLayer2");
var demoinstance7 = document.getElementById("secondLayer3");
var demoinstance8 = document.getElementById("secondLayer4");

// Animate after a 5 second delay
// setTimeout(function() {
//   demoinstance1.animate("enable"); // Specify the name of the event to trigger
//   demoinstance2.animate("enable");
//   demoinstance3.animate("enable");
//   demoinstance4.animate("enable");

// }, 5000);