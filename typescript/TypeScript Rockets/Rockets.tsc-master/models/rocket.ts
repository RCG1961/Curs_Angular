class Rocket {
    //rocket properties
    //8 characters and a number of thrusters for each rocket

    rocketId: string;
    numThrusters: number;
    colorRocket: string;
    //speed is the sum of all power thrusters 
    speedRocket: number;
    thrustersArray: Thruster[] = new Array();
    launchRocket: boolean;
    position: number;

    constructor(rocketId: string, numThrusters: number, colorRocket: string, speedRocket: number, launchRocket: boolean, position: number) {
        this.rocketId = rocketId;
        this.numThrusters = numThrusters;
        this.colorRocket = colorRocket;
        this.speedRocket = speedRocket;
        this.launchRocket = launchRocket;
        this.position = position;

    }
    // to add thrusters to the rocket object
    addThruster(thrusterX: Thruster): void {
        this.thrustersArray.push(thrusterX);
    }

    // accelerate method, increase of 10 each thruster
    accelerate(): void {

        //increase by 10 the current thrust of each thruster but check its max thrust
        for (let i = 0; i <= this.thrustersArray.length - 1; i++) {

            if (this.thrustersArray[i].currentThrust < this.thrustersArray[i].thrustMaxPower) {
                this.thrustersArray[i].currentThrust += 10;
            }
            else {
                console.log(this.thrustersArray[i].thrusterId + ", " + this.thrustersArray[i].currentThrust + "is the max thrust");
            }
        }
        let myjson = JSON.stringify(this.thrustersArray);
        console.log("Thrust array " + myjson);

        speedOfRocket(this);
        //speedText1();
        this.moveRocket();


        (this == rocket1) ? showRocket1Info() : false;
        (this == rocket2) ? showRocket2Info() : false;


    }


    //break method, decrease of 10 each thruster
    breakRocket(): void {
        for (let i = 0; i <= this.thrustersArray.length - 1; i++) {

            let arrthrust = this.thrustersArray[i];

            if (arrthrust.currentThrust > 0  ) {
                arrthrust.currentThrust -= 10;
                this.speedRocket -= 10;
            }
            else {
                console.log(arrthrust.thrusterId + ", " + arrthrust.currentThrust + "is the minimum thrust");
              
            }
            (rocket1) ? showRocket1Info() : false;
            (rocket2) ? showRocket2Info() : false;

        }
        let myjson = JSON.stringify(this.thrustersArray);
        console.log("Thrust array " + myjson);
        var sp = speedOfRocket(this);
        //speedText1();
        this.moveRocket();

    }
                             // mio
    stopRocket(): void {
        alert('mio');
    for (let i = 0; i <= this.thrustersArray.length - 1; i++) {

        let arrthrust = this.thrustersArray[i];

        if (arrthrust.currentThrust > 0  ) {
            arrthrust.currentThrust -= 10;
            this.speedRocket -= 10;
        }
        else {
            console.log(arrthrust.thrusterId + ", " + arrthrust.currentThrust + "is the minimum thrust");
            
        }
        (rocket1) ? showRocket1Info() : false;
        (rocket2) ? showRocket2Info() : false;

    }
    let myjson = JSON.stringify(this.thrustersArray);
    console.log("Thrust array " + myjson);
    var sp = speedOfRocket(this);
    //speedText1();
    this.moveRocket();

}                         
    // move rockets
    moveRocket() {

        this.launchRocket = true;
        var id: number = 0;
        let _this = this; //

        if (this.launchRocket && this.speedRocket == 0) {
            false;
            this.speedRocket= 0;
        } else {
            var id = setInterval(frame, 1);
        }
        //this function is necessary to make work the animation asynchronous of the two rockets.
        function frame() {
            var elem1 = <HTMLElement>document.getElementById("rocketId1");
            var elem2 = <HTMLElement>document.getElementById("rocketId2");
          

            if (_this.position >= 900 ) {
               // clearInterval(id);
                _this.position = 0;                
                _this.launchRocket = false;

            } else {
            _this.position += _this.speedRocket/5000;
                _this.launchRocket = true;
                (_this == rocket1) ? elem1.style.left = _this.position + 'px' : false;
                (_this == rocket2) ? elem2.style.left = _this.position + 'px' : false;
               elem1.innerHTML = "<span class='txtspeed'>speed :"+ rocket1.speedRocket +",pos: "+ rocket1.position+"</span>";
               elem2.innerHTML = "<span class='txtspeed'>speed :"+ rocket2.speedRocket +",pos: "+ rocket2.position+"</span>";
            }


        } // end frame          
    }// end moveRocket()







}// end Rocket