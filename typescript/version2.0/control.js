/* @ts-ignore */
var car;
/* @ts-ignore */
var cars = [];
/* @ts-ignore */
var regular_expresion_matricula = /^[0-9]{4}[A-Z]{3}/; //formato matricula 4 numeros y 3 letras
// INPUTS
// Form
var formulario1 = document.querySelector('.form_coches');
var formulario2 = document.querySelector('.form_ruedas');
// Coche
var matricula = document.getElementById("matricula");
var marca = document.getElementById("marca");
var color = document.getElementById("color");
// Ruedas
var rueda_1 = document.getElementById("r1");
var rueda_2 = document.getElementById("r2");
var rueda_3 = document.getElementById("r3");
var rueda_4 = document.getElementById("r4");
var diametro_1 = document.getElementById("d1");
var diametro_2 = document.getElementById("d2");
var diametro_3 = document.getElementById("d3");
var diametro_4 = document.getElementById("d4");
// METHODS
function createCar(xplate, xbrand, xcolor) {
    car = new Car(xplate, xcolor, xbrand);
    cars.push(car);
    function printCarData() {
        var _a, _b;
        // @ts-ignore: Object is possibly 'null'.
        (_a = document.getElementById('titleCard')) === null || _a === void 0 ? void 0 : _a.innerHTML = 'Matrícula: ' + matricula.value.toUpperCase();
        // @ts-ignore: Object is possibly 'null'.
        (_b = document.getElementById('brandColorCard')) === null || _b === void 0 ? void 0 : _b.innerHTML = 'Marca: ' + marca.value.toUpperCase() + ' Color: ' + color.value.toUpperCase();
    }
    printCarData();
}
// Forms
function showCard() {
    // @ts-ignore: Object is possibly 'null'.
    document.getElementById("form_coches").style.display = "none";
    // @ts-ignore: Object is possibly 'null'.
    document.getElementById("card_descripcion").style.display = "block";
    // @ts-ignore: Object is possibly 'null'.
    document.getElementById("form_ruedas").style.display = "block";
}
// Control de los Inputs del formulario coches
formulario1.addEventListener("submit", function (e) {
    e.preventDefault();
    // Control de la matricula con ExpReg
    if (!regular_expresion_matricula.test(matricula.value.toUpperCase()) || matricula.value === "") {
        // @ts-ignore: Object is possibly 'null'
        document.getElementById("matricula").className = "form-control is-invalid";
        // @ts-ignore: Object is possibly 'null'
        document.getElementById("validarM").innerHTML = "Matrícula de 4 numeros y 3 letras";
        // @ts-ignore: Object is possibly 'null'
    }
    else {
        // @ts-ignore: Object is possibly 'null' 
        document.getElementById("validarM").innerHTML = " ";
        // @ts-ignore: Object is possibly 'null'.
        document.getElementById("matricula").className = "form-control is-valid";
        showCard();
        alert('Entrar los datos de las ruedas');
        createCar(matricula.value.toUpperCase(), marca.value.toUpperCase(), color.value.toUpperCase());
        cars.push(car); //añadimos el coche actual a la matriz
    }
});
formulario2.addEventListener("submit", function (e) {
    e.preventDefault();
    var newCar = cars[cars.length - 1]; //Cogemos el ultimo elemento de la array de coches
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
    document.getElementById("wheelsTitleCard").innerHTML = "Marcas de las Ruedas y diámetros de las mismas";
    //Añadimos las ruedas de los coches  sus diametros y su marca
    newCar.addWheel(new Wheel(parseFloat(diametro_1.value), rueda_1.value.toUpperCase()));
    newCar.addWheel(new Wheel(parseFloat(diametro_2.value), rueda_2.value.toUpperCase()));
    newCar.addWheel(new Wheel(parseFloat(diametro_3.value), rueda_3.value.toUpperCase()));
    newCar.addWheel(new Wheel(parseFloat(diametro_4.value), rueda_4.value.toUpperCase()));
    console.log(car);
    console.log(newCar);
    console.log(cars);
    // @ts-ignore: Object is possibly 'null'.
    document.getElementById("form_ruedas").style.display = "none";
    // @ts-ignore: Object is possibly 'null'.
    document.getElementById("repe").style.display = "block";
});
function Repetir() {
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
