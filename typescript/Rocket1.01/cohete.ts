
var velocidad1:number=0;
var velocidad2:number=0;

/* @ts-ignore */
class Rocket {
    //rocket properties
    //8 characters and a number of thrusters for each rocket

    rocketId: string;
    numPropulsores: number;
    colorRocket: string;
    //speed is the sum of all power thrusters 
    speedRocket: number;
    PropulsoresArray: Propulsor[] = new Array();
    launchRocket: boolean;
    position: number;

    constructor(rocketId: string, numPropulsores: number, colorRocket: string, speedRocket: number, launchRocket: boolean, position: number) {
        this.rocketId = rocketId;
        this.numPropulsores = numPropulsores;
        this.colorRocket = colorRocket;
        this.speedRocket = speedRocket;
        this.launchRocket = launchRocket;
        this.position = position;

    }
    // to add thrusters to the rocket object
    addPotencia(addKw: Propulsor): void {
        this.PropulsoresArray.push(addKw);
    }

   
    accelerate(): void {
        //increase by 10 the current thrust of each thruster but check its max thrust
        for (let i = 0; i <= this.PropulsoresArray.length - 1; i++) {

            if (this.PropulsoresArray[i].PropulsorActive < this.PropulsoresArray[i].PropulsorPower) {
                this.PropulsoresArray[i].PropulsorActive += 10;
            }
            else {
                console.log(this.PropulsoresArray[i].PropulsorId + ", " + this.PropulsoresArray[i].PropulsorActive + "es el máximo de potencia");
            }
        }
        let myjson = JSON.stringify(this.PropulsoresArray);
        console.log("Array de Potencia " + myjson);

        speedOfRocket(this);
        this.moveRocket();


        (this == rocket1) ? showRocket1Info() : false;
        (this == rocket2) ? showRocket2Info() : false;


    }


    //break method, decrease of 10 each thruster
    breakRocket(): void {
        for (let i = 0; i <= this.PropulsoresArray.length - 1; i++) {

            let kw_Propulsor = this.PropulsoresArray[i];

            if (kw_Propulsor.PropulsorActive > 0  ) {
                kw_Propulsor.PropulsorActive -= 10;
                this.speedRocket -= 10;
            }
            else {
                console.log(kw_Propulsor.PropulsorId + ", " + kw_Propulsor.PropulsorActive + "is the minimum thrust");
              
            }
            (rocket1) ? showRocket1Info() : false;
            (rocket2) ? showRocket2Info() : false;

        }
        let myjson = JSON.stringify(this.PropulsoresArray);
        console.log("Array de Propulsores " + myjson);
        var sp = speedOfRocket(this);
        this.moveRocket();
    }
      
    stop(): void {
        if(this == rocket1){       
          /* @ts-ignore */
          let buton_m1:string = <HTMLElement>document.getElementById("stop1").textContent;
          if(buton_m1 ==='PARAR'){
           /* @ts-ignore */
               document.getElementById("stop1").textContent="CONTINUAR";
               velocidad1 = rocket1.speedRocket;
               rocket1.speedRocket=0;
          }
          else{
               /* @ts-ignore */
               document.getElementById("stop1").textContent="PARAR"; 
               rocket1.speedRocket=velocidad1;
          }
          (rocket1) ? showRocket1Info() : false;
          this.moveRocket();    
        }
        else{
          /* @ts-ignore */
          let buton_m2:string = <HTMLElement>document.getElementById("stop2").textContent;        
          if(buton_m2 ==='PARAR'){
            /* @ts-ignore */
            document.getElementById("stop2").textContent="CONTINUAR";
            velocidad2 = rocket2.speedRocket;
            rocket2.speedRocket=0;     
          }     
          else{
              /* @ts-ignore */
              document.getElementById("stop2").textContent="PARAR"; 
              rocket2.speedRocket=velocidad2;
          }
           (rocket2) ? showRocket2Info() : false;
           rocket2.moveRocket();
        }       
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
        function frame():void {
            var elem1 = <HTMLElement>document.getElementById("rocketId1");
            var elem2 = <HTMLElement>document.getElementById("rocketId2");
            var nota =  <HTMLElement> document.getElementById('cursa');
            var musica = <HTMLElement>document.getElementById('winer');
            

            if (_this.position >= screen.width ) {
                _this.position = 0;                
                _this.launchRocket = false;

            } else {
            _this.position += _this.speedRocket/5000;
                _this.launchRocket = true;
                (_this == rocket1) ? elem1.style.left = _this.position + 'px' : false;
                (_this == rocket2) ? elem2.style.left = _this.position + 'px' : false;
                if((rocket1.position>1140)){
                    
                    nota.innerHTML = 'ROCKET 1 ha llegado al sol ¡GANADOR!';
                    /* @ts-ignore */
                    document.getElementById('winer').play();
                    /* @ts-ignore */
                    setInterval(function() {nota.style.opacity = (nota.style.opacity == 0 ? 1 : 0);}, 200);
                    rocket1.speedRocket=0;
                    rocket1.position=1141; 
                    elem1.innerHTML = 'winner';
                    rocket2.speedRocket=0;
                }
                else{
                    if(rocket2.position==1141){
                        elem1.innerHTML ='loser';
                    }
                    else{
                        elem1.innerHTML = "<span class='txtspeed'>velocidad :"+ rocket1.speedRocket*155 +"Mph.        Espacio recorrido: "+ (rocket1.position*131123).toLocaleString()+' km.'+"</span>";
                    }
                    
                }
                if((rocket2.position)>1140){
                    rocket2.speedRocket=0;
                    rocket2.position=1141; 
                    elem2.innerHTML = 'winner';
                    nota.innerHTML='ROCKET2 ha llegado al sol ¡GANADOR!';
                    /* @ts-ignore */
                    document.getElementById('winer').play();
                    /* @ts-ignore */
                    setInterval(function() {nota.style.opacity = (nota.style.opacity == 0 ? 1 : 0);}, 200);
                     rocket1.speedRocket=0;
                }
                else{
                    if(rocket1.position==1141){
                      elem2.innerHTML = 'loser';
                    }
                    else{
                       elem2.innerHTML = "<span class='txtspeed'>velocidad :"+ rocket2.speedRocket*110 +"Mph.        Espacio recorrido: "+ (rocket2.position*131123).toLocaleString()+' km.'+"</span>";
                    }
                }
               
               
            }
 

        } // end frame          
    }// end moveRocket()


}// end Rocket