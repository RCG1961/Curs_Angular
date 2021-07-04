//define DOM id pointers
 /* @ts-ignore */
let rocket1Info = <HTMLElement>document.getElementById("rocket1Info");
/* @ts-ignore */
let rocket2Info = <HTMLElement>document.getElementById("rocket2Info");
/* @ts-ignore */
let rocketId1 = <HTMLElement>document.getElementById("rocketId1");
/* @ts-ignore */
let rocketId2 = <HTMLElement>document.getElementById("rocketId2");
/* @ts-ignore */
let cohete1 = <HTMLElement>document.getElementById("cohete1");
/* @ts-ignore */
let cohete2 = <HTMLElement>document.getElementById("cohete2");

// define Rockets              (Cohetes)
/* @ts-ignore */
let rocket1: Rocket;
/* @ts-ignore */
let rocket2: Rocket;


                                             //CREACION DE LOS COHETES
/* @ts-ignore */
function createRocket1():void {
    /* @ts-ignore */
    let buton_m1:string = <HTMLElement>document.getElementById("crear1").textContent;
    switch (buton_m1){
        case 'CREAR':
            /* @ts-ignore */
            document.getElementById("crear1").textContent="PRINT OFF";
            rocketId1.classList.remove("d-none");                      // Hacemos visible el cohete rojo
            rocket1 = new Rocket("32WESSDS", 3, "Red", 0, false, 0);
            rocket1.addPotencia(new Propulsor("Kw1_rocket1", 10, 0));
            rocket1.addPotencia(new Propulsor("Kw2_rocket1", 30, 0));
            rocket1.addPotencia(new Propulsor("Kw3-rocket1", 80, 0));
            break;
        case 'PRINT OFF':
            /* @ts-ignore */
            document.getElementById("crear1").textContent="PRINT  ON";
            rocket1Info.style.display="none";
            cohete1.style.display="block";
            cohete1.innerHTML="Cohete código: "+rocket1.rocketId;
            break;
        case 'PRINT  ON':
            /* @ts-ignore */
            document.getElementById("crear1").textContent="PRINT OFF";
            cohete1.style.display="none";
            rocket1Info.style.display="block";
            break;
    } 
    
    showRocket1Info();
}

/* @ts-ignore */
function createRocket2():void {
    /* @ts-ignore */ 
    let buton_m2:string = <HTMLElement>document.getElementById("crear2").textContent;
    switch (buton_m2){
        case 'CREAR':
            /* @ts-ignore */
            document.getElementById("crear2").textContent="PRINT OFF";
            rocketId2.classList.remove("d-none");                           // Hacemos visible el cohete azul
            rocket2 = new Rocket("LDSFJA32", 6, "Blue", 0, false, 0);
            rocket2.addPotencia(new Propulsor("Kw1_rocket2", 30, 0));
            rocket2.addPotencia(new Propulsor("Kw2_rocket2", 40, 0));
            rocket2.addPotencia(new Propulsor("Kw3_rocket2", 50, 0));
            rocket2.addPotencia(new Propulsor("Kw4_rocket2", 50, 0));
            rocket2.addPotencia(new Propulsor("Kw5_rocket2", 30, 0));
            rocket2.addPotencia(new Propulsor("Kw6_rocket2", 10, 0));
            break;
        case 'PRINT OFF':
            /* @ts-ignore */
            document.getElementById("crear2").textContent="PRINT  ON";
            rocket2Info.style.display="none";
            cohete2.style.display="block";
            cohete2.innerHTML="Cohete código: "+rocket2.rocketId;
            break;
        case 'PRINT  ON':
            /* @ts-ignore */
            document.getElementById("crear2").textContent="PRINT OFF";
            cohete2.style.display="none";
            rocket2Info.style.display="block";
            break;
    } 

    

    showRocket2Info();

}

/* @ts-ignore */
function speedOfRocket(aRocket: Rocket):number {
    
    aRocket.speedRocket = 0;

    for (var i = 0; i <= aRocket.PropulsoresArray.length - 1; i++) {
        if(aRocket.speedRocket >= 210 && aRocket.PropulsoresArray[i].PropulsorActive >= aRocket.PropulsoresArray[i].PropulsorPower){
            aRocket.speedRocket = 0;
        }else{
            aRocket.speedRocket += aRocket.PropulsoresArray[i].PropulsorActive; 
        }

    }
    console.log("speed of rocket= " + aRocket.speedRocket);
        return aRocket.speedRocket;
    }

/* @ts-ignore */ 
function showRocket1Info():void {
                
    let potmax1:number = 0;
    for(let i=0;i<(rocket1.PropulsoresArray.length);i++){potmax1 += rocket1.PropulsoresArray[i].PropulsorPower;}
    let vel_max1:number =(potmax1*155);
    rocket1Info.style.borderColor="red";
    rocket1Info.innerHTML = "Cohete código: " + rocket1.rocketId +
        "<br>Número de propulsores " + rocket1.numPropulsores +
        "<br>Potencia propulsores  (" + `${maximaPropulsion(rocket1.PropulsoresArray)}` + "). " +
        "<br>Potencia total del cohete "+potmax1+' Kw.'+
        "<br>Potencia actual del cohete "+rocket1.speedRocket+
        "<br>Velocidad máxima del Cohete 1 "+vel_max1.toLocaleString()+' Mph.'+
        "<br>Velocidad actual del Cohete 1 es " + (rocket1.speedRocket*155).toLocaleString()+' Mph.';     
}

/* @ts-ignore */
function showRocket2Info():void {
   
    let potmax2:number = 0;
    for(let i=0;i<(rocket2.PropulsoresArray.length);i++){potmax2 += rocket2.PropulsoresArray[i].PropulsorPower;}
    let vel_max2:number =(potmax2*110);
    rocket2Info.style.borderColor="blue";
    rocket2Info.innerHTML = "Cohete código: " + rocket2.rocketId + 
        "<br>Número de propulsores " + rocket2.numPropulsores +
        "<br>Potencia propulsores  (" + `${maximaPropulsion(rocket2.PropulsoresArray)}` + ")." +
        "<br>Potencia total del cohete "+potmax2+' Kw.'+
        "<br>Potencia actual del cohete "+rocket2.speedRocket+
        "<br>Velocidad máxima del Cohete 2 "+vel_max2.toLocaleString()+' Mph.'+
        "<br>Velocidad del Cohete 2 es " + (rocket2.speedRocket*110).toLocaleString()+' Mph.';
}


function maximaPropulsion(oneArr: Array<Propulsor>):string {
    var Datos: string = "";
    for (var i = 0; i <= oneArr.length - 1; i++) {
        if (i == oneArr.length - 1) {//we remove last comma here
            Datos += oneArr[i].PropulsorPower;
        } else {
            Datos += oneArr[i].PropulsorPower + ", ";
        }
    }
    return Datos;
}
