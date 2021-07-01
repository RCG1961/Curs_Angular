var Rocket = /** @class */ (function () {
    function Rocket(rocketId, numThrusters, colorRocket, speedRocket, launchRocket, position) {
        this.thrustersArray = new Array();
        this.rocketId = rocketId;
        this.numThrusters = numThrusters;
        this.colorRocket = colorRocket;
        this.speedRocket = speedRocket;
        this.launchRocket = launchRocket;
        this.position = position;
    }
    // to add thrusters to the rocket object
    Rocket.prototype.addThruster = function (thrusterX) {
        this.thrustersArray.push(thrusterX);
    };
    // accelerate method, increase of 10 each thruster
    Rocket.prototype.accelerate = function () {
        //increase by 10 the current thrust of each thruster but check its max thrust
        for (var i = 0; i <= this.thrustersArray.length - 1; i++) {
            if (this.thrustersArray[i].currentThrust < this.thrustersArray[i].thrustMaxPower) {
                this.thrustersArray[i].currentThrust += 10;
            }
            else {
                console.log(this.thrustersArray[i].thrusterId + ", " + this.thrustersArray[i].currentThrust + "is the max thrust");
            }
        }
        var myjson = JSON.stringify(this.thrustersArray);
        console.log("Thrust array " + myjson);
        speedOfRocket(this);
        //speedText1();
        this.moveRocket();
        (this == rocket1) ? showRocket1Info() : false;
        (this == rocket2) ? showRocket2Info() : false;
    };
    //break method, decrease of 10 each thruster
    Rocket.prototype.breakRocket = function () {
        for (var i = 0; i <= this.thrustersArray.length - 1; i++) {
            var arrthrust = this.thrustersArray[i];
            if (arrthrust.currentThrust > 0) {
                arrthrust.currentThrust -= 10;
                this.speedRocket -= 10;
            }
            else {
                console.log(arrthrust.thrusterId + ", " + arrthrust.currentThrust + "is the minimum thrust");
            }
            (rocket1) ? showRocket1Info() : false;
            (rocket2) ? showRocket2Info() : false;
        }
        var myjson = JSON.stringify(this.thrustersArray);
        console.log("Thrust array " + myjson);
        var sp = speedOfRocket(this);
        //speedText1();
        this.moveRocket();
    };
    // mio
    Rocket.prototype.stopRocket = function () {
        alert('mio');
        for (var i = 0; i <= this.thrustersArray.length - 1; i++) {
            var arrthrust = this.thrustersArray[i];
            if (arrthrust.currentThrust > 0) {
                arrthrust.currentThrust -= 10;
                this.speedRocket -= 10;
            }
            else {
                console.log(arrthrust.thrusterId + ", " + arrthrust.currentThrust + "is the minimum thrust");
            }
            (rocket1) ? showRocket1Info() : false;
            (rocket2) ? showRocket2Info() : false;
        }
        var myjson = JSON.stringify(this.thrustersArray);
        console.log("Thrust array " + myjson);
        var sp = speedOfRocket(this);
        //speedText1();
        this.moveRocket();
    };
    // move rockets
    Rocket.prototype.moveRocket = function () {
        this.launchRocket = true;
        var id = 0;
        var _this = this; //
        if (this.launchRocket && this.speedRocket == 0) {
            false;
            this.speedRocket = 0;
        }
        else {
            var id = setInterval(frame, 1);
        }
        //this function is necessary to make work the animation asynchronous of the two rockets.
        function frame() {
            var elem1 = document.getElementById("rocketId1");
            var elem2 = document.getElementById("rocketId2");
            if (_this.position >= 900) {
                // clearInterval(id);
                _this.position = 0;
                _this.launchRocket = false;
            }
            else {
                _this.position += _this.speedRocket / 5000;
                _this.launchRocket = true;
                (_this == rocket1) ? elem1.style.left = _this.position + 'px' : false;
                (_this == rocket2) ? elem2.style.left = _this.position + 'px' : false;
                elem1.innerHTML = "<span class='txtspeed'>speed :" + rocket1.speedRocket + ",pos: " + rocket1.position + "</span>";
                elem2.innerHTML = "<span class='txtspeed'>speed :" + rocket2.speedRocket + ",pos: " + rocket2.position + "</span>";
            }
        } // end frame          
    }; // end moveRocket()
    return Rocket;
}()); // end Rocket
