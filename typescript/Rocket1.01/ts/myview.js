function showRocket1Info() {
    rocket1Info.innerHTML = "Rocket id = " + rocket1.rocketId +
        "<br> number of Thrusters = " + rocket1.numThrusters +
        "<br> max thrust = (" + ("" + maxThrustArrIteration(rocket1.thrustersArray)) + "). " +
        "<br>Speed of Rocket 1 is " + rocket1.speedRocket;
    //*** here i have a question about the String Template, how to use it a when as the String template can be change 
    //to leave the function itself and also works?? */
}
function showRocket2Info() {
    rocket2Info.innerHTML = "Rocket id = " + rocket2.rocketId + "<br>number of Thrusters = " + rocket2.numThrusters +
        "<br>max thrust = (" + ("" + maxThrustArrIteration(rocket2.thrustersArray)) + ")." +
        "<br>Speed of Rocket 2 is " + rocket2.speedRocket;
}
// QUESTION implicitly has an any type.
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
