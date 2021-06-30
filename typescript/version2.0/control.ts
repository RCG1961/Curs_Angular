/* @ts-ignore */
let car: Car;
/* @ts-ignore */
let cars: Car[] = [];
/* @ts-ignore */

const regular_expresion_matricula = /^[0-9]{4}[A-Z]{3}/;         //formato matricula 4 numeros y 3 letras

// INPUTS
// Form
const formulario1 = document.querySelector('.form_coches') as HTMLFormElement;
const formulario2 = document.querySelector('.form_ruedas') as HTMLFormElement;

// Coche
const matricula =<HTMLInputElement>document.getElementById("matricula");
const marca =<HTMLInputElement>document.getElementById("marca");
const color =<HTMLInputElement>document.getElementById("color");

// Ruedas
const rueda_1 = <HTMLInputElement>document.getElementById("r1");
const rueda_2 = <HTMLInputElement>document.getElementById("r2");
const rueda_3 = <HTMLInputElement>document.getElementById("r3");
const rueda_4 = <HTMLInputElement>document.getElementById("r4");
const diametro_1 = <HTMLInputElement>document.getElementById("d1");
const diametro_2 = <HTMLInputElement>document.getElementById("d2");
const diametro_3 = <HTMLInputElement>document.getElementById("d3");
const diametro_4 = <HTMLInputElement>document.getElementById("d4");

// METHODS
function createCar(xplate: string, xbrand: string, xcolor: string): void {
    car = new Car(xplate, xcolor, xbrand);
    cars.push(car);

    function printCarData() {
        // @ts-ignore: Object is possibly 'null'.
        document.getElementById('titleCard')?.innerHTML = 'Matrícula: '+matricula.value.toUpperCase();
        // @ts-ignore: Object is possibly 'null'.
        document.getElementById('brandColorCard')?.innerHTML ='Marca: '+ marca.value.toUpperCase()+' Color: '+color.value.toUpperCase();
    }
    printCarData();
}

// Forms
function showCard(): void {
    // @ts-ignore: Object is possibly 'null'.
    document.getElementById("form_coches").style.display = "none";
    // @ts-ignore: Object is possibly 'null'.
    document.getElementById("card_descripcion").style.display = "block";
    // @ts-ignore: Object is possibly 'null'.
    document.getElementById("form_ruedas").style.display = "block";
}

// Control de los Inputs del formulario coches
formulario1.addEventListener("submit", (e: Event) => {
    e.preventDefault();
    
    // Control de la matricula con ExpReg
    if (!regular_expresion_matricula.test(matricula.value.toUpperCase()) || matricula.value === "") {
        
        // @ts-ignore: Object is possibly 'null'
        document.getElementById("matricula").className = "form-control is-invalid";
        // @ts-ignore: Object is possibly 'null'
        document.getElementById("validarM").innerHTML =  "Matrícula de 4 numeros y 3 letras" ;
        // @ts-ignore: Object is possibly 'null'
        
    } else {
        
        // @ts-ignore: Object is possibly 'null' 
        document.getElementById("validarM").innerHTML =" ";
        // @ts-ignore: Object is possibly 'null'.
        document.getElementById("matricula").className = "form-control is-valid";
                     
        showCard();
        
        alert('Entrar los datos de las ruedas');
        createCar(matricula.value.toUpperCase(), marca.value.toUpperCase(), color.value.toUpperCase());
        cars.push(car);                       //añadimos el coche actual a la matriz
    }
});



formulario2.addEventListener("submit", (e: Event) => {
    e.preventDefault();
    let newCar = cars[cars.length - 1];                //Cogemos el ultimo elemento de la array de coches
 
     //@ts-ignore: Object is possibly 'null' 
    document.getElementById("roda_1").innerHTML = rueda_1.value.toUpperCase();
     //@ts-ignore: Object is possibly 'null' 
     document.getElementById("roda_2").innerHTML = rueda_2.value.toUpperCase();
    // @ts-ignore: Object is possibly 'null' 
    document.getElementById("roda_3").innerHTML = rueda_3.value.toUpperCase();
  // @ts-ignore: Object is possibly 'null' 
    document.getElementById("roda_4").innerHTML = rueda_4.value.toUpperCase();
    // @ts-ignore: Object is possibly 'null' 
    document.getElementById("Diam_1").innerHTML = parseFloat(diametro_1.value.toUpperCase());
    // @ts-ignore: Object is possibly 'null' 
     document.getElementById("Diam_2").innerHTML = parseFloat(diametro_2.value.toUpperCase());
    // @ts-ignore: Object is possibly 'null' 
     document.getElementById("Diam_3").innerHTML = parseFloat(diametro_3.value.toUpperCase());
    // @ts-ignore: Object is possibly 'null' 
    document.getElementById("Diam_4").innerHTML = parseFloat(diametro_4.value.toUpperCase());
     // @ts-ignore: Object is possibly 'null' 
     document.getElementById("wheelsTitleCard").innerHTML ="Marcas de las Ruedas y diámetros de las mismas";
    //Añadimos las ruedas de los coches  sus diametros y su marca
    newCar.addWheel(new Wheel(parseFloat(diametro_1.value),rueda_1.value.toUpperCase()));
    newCar.addWheel(new Wheel(parseFloat(diametro_2.value),rueda_2.value.toUpperCase()));
    newCar.addWheel(new Wheel(parseFloat(diametro_3.value),rueda_3.value.toUpperCase()));
    newCar.addWheel(new Wheel(parseFloat(diametro_4.value),rueda_4.value.toUpperCase()));
    console.log(car);
    console.log(newCar);
    console.log(cars);
     // @ts-ignore: Object is possibly 'null'.
     document.getElementById("form_ruedas").style.display = "none";
      // @ts-ignore: Object is possibly 'null'.
     document.getElementById("repe").style.display = "block";
});   

function Repetir(){
    // @ts-ignore: Object is possibly 'null'.
    document.getElementById("form_ruedas").style.display = "none";
    // @ts-ignore: Object is possibly 'null'.
    document.getElementById("form_coches").style.display = "block";
    // @ts-ignore: Object is possibly 'null'.
    document.getElementById("repetimos").style.display = "none";
    // @ts-ignore: Object is possibly 'null'.
    document.getElementById("card_descripcion").style.display = "none";
    // @ts-ignore: Object is possibly 'null'.
    document.getElementById("repe").style.display = "none";
}