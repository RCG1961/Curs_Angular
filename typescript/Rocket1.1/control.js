//define DOM id pointers
/* @ts-ignore */
var rocket1Info = document.getElementById("rocket1Info");
var rocket2Info = document.getElementById("rocket2Info");
var rocketId1 = document.getElementById("rocketId1");
var rocketId2 = document.getElementById("rocketId2");
//rocket effects when click accelerate and break
var accelerateButton1 = document.getElementById("accelerateButton1");
var breakButton1 = document.getElementById("breakButton1");
var stopButton1 = document.getElementById("stopButton1");
var accelerateButton2 = document.getElementById("accelerateButton2");
var breakButton2 = document.getElementById("breakButton2");
var stopButton2 = document.getElementById("stopButton2");
// add event listeners to the buttons when click
accelerateButton1.addEventListener("click", changeColorAccelerate);
breakButton1.addEventListener("click", changeColorBreak);
stopButton1.addEventListener("click", changeColorStop);
accelerateButton2.addEventListener("click", changeColorAccelerate2);
breakButton2.addEventListener("click", changeColorBreak2);
stopButton2.addEventListener("click", changeColorStop2);
// define Rockets
var rocket1;
var rocket2;
//create rockets
function createRocket1() {
    rocketId1.classList.remove("d-none");
    //object rocket id, num of Thrusters, color, speed, launched false/true, position
    rocket1 = new Rocket("32WESSDS", 3, "Red", 0, false, 0);
    var thrusterRocket1_10 = new Thruster("th0110", 10, 0);
    var thrusterRocket1_30 = new Thruster("th0130", 30, 0);
    var thrusterRocket1_80 = new Thruster("th0180", 80, 0);
    // add thruster to the Object rocket1 into the thrustersArray
    rocket1.addThruster(thrusterRocket1_10);
    rocket1.addThruster(thrusterRocket1_30);
    rocket1.addThruster(thrusterRocket1_80);
    showRocket1Info();
}
function createRocket2() {
    rocketId2.classList.remove("d-none");
    rocket2 = new Rocket("LDSFJA32", 6, "Blue", 0, false, 0);
    var thrusterRocket230 = new Thruster("th0230", 30, 0);
    var thrusterRocket240 = new Thruster("th40", 40, 0);
    var thrusterRocket250 = new Thruster("th250", 50, 0);
    var thrusterRocket250b = new Thruster("th250b", 50, 0);
    var thrusterRocket230b = new Thruster("th230b", 30, 0);
    var thrusterRocket210 = new Thruster("th210", 10, 0);
    rocket2.addThruster(thrusterRocket230);
    rocket2.addThruster(thrusterRocket240);
    rocket2.addThruster(thrusterRocket250);
    rocket2.addThruster(thrusterRocket250b);
    rocket2.addThruster(thrusterRocket230b);
    rocket2.addThruster(thrusterRocket210);
    showRocket2Info();
}
// get speed of Rocket.
function speedOfRocket(aRocket) {
    aRocket.speedRocket = 0;
    for (var i = 0; i <= aRocket.thrustersArray.length - 1; i++) {
        if (aRocket.speedRocket >= 210 && aRocket.thrustersArray[i].currentThrust >= aRocket.thrustersArray[i].thrustMaxPower) {
            aRocket.speedRocket = 0;
        }
        else {
            aRocket.speedRocket += aRocket.thrustersArray[i].currentThrust;
        }
    }
    console.log("speed of rocket= " + aRocket.speedRocket);
    return aRocket.speedRocket;
}
function changeColorAccelerate() {
    rocketId1.classList.toggle("accelerate");
}
function changeColorBreak() {
    rocketId1.classList.toggle("break");
}
function changeColorAccelerate2() {
    rocketId2.classList.toggle("accelerate");
}
function changeColorBreak2() {
    rocketId2.classList.toggle("break");
}
function changeColorStop() {
    rocketId1.classList.toggle("stop");
}
function changeColorStop2() {
    rocketId2.classList.toggle("stop");
}
function Proba() {
    if (document.getElementById('print1').disabled) {
        alert('disable');
    }
    else {
        alert('no disable');
    }
}
function showRocket1Info() {
    var potmax1 = 0;
    for (var i = 0; i < (rocket1.thrustersArray.length); i++) {
        potmax1 += rocket1.thrustersArray[i].thrustMaxPower;
    }
    var vel_max1 = (potmax1 * 155);
    rocket1Info.style.borderColor = "red";
    document.getElementById('print1').visibility = "initial";
    rocket1Info.innerHTML = "Cohete código: " + rocket1.rocketId +
        "<br>Número de propulsores " + rocket1.numThrusters +
        "<br>Potencia propulsores  (" + ("" + maxThrustArrIteration(rocket1.thrustersArray)) + "). " +
        "<br>Potencia total del cohete " + potmax1 + ' Kw.' +
        "<br>Velocidad máxima del Cohete 1 " + vel_max1.toLocaleString() + ' Mph.' +
        "<br>Velocidad actual del Cohete 1 es " + (rocket1.speedRocket * 155).toLocaleString() + ' Mph.';
}
function showRocket2Info() {
    var potmax2 = 0;
    for (var i = 0; i < (rocket2.thrustersArray.length); i++) {
        potmax2 += rocket2.thrustersArray[i].thrustMaxPower;
    }
    var vel_max2 = (potmax2 * 110);
    rocket2Info.style.borderColor = "blue";
    rocket2Info.innerHTML = "Cohete código: " + rocket2.rocketId +
        "<br>Número de propulsores " + rocket2.numThrusters +
        "<br>Potencia propulsores  (" + ("" + maxThrustArrIteration(rocket2.thrustersArray)) + ")." +
        "<br>Potencia total del cohete " + potmax2 + ' Kw.' +
        "<br>Velocidad máxima del Cohete 2 " + vel_max2.toLocaleString() + ' Mph.' +
        "<br>Velocidad del Cohete 2 es " + (rocket2.speedRocket * 110).toLocaleString() + ' Mph.';
}
function maxThrustArrIteration(oneArr) {
    var arrThrustData = "";
    for (var i = 0; i <= oneArr.length - 1; i++) {
        if (i == oneArr.length - 1) { //we remove last comma here
            arrThrustData += oneArr[i].thrustMaxPower;
        }
        else {
            arrThrustData += oneArr[i].thrustMaxPower + ", ";
        }
    }
    return arrThrustData;
}
