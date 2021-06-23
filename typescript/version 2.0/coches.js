let car = Car;
let cotxes =[];          //array de car
var global;

"use strict";
var Wheel = /** @class */ (function () {
    function Wheel(diameter, brand) {
        this.diameter = diameter;
        this.brand = brand;
    }
    return Wheel;
}());

var Car = /** @class */ (function () {
    function Car(plate, color, brand) {
        this.wheels = new Array();
        this.plate = plate;
        this.color = color;
        this.brand = brand;
    }
    Car.prototype.addWheel = function (wheel) {
        this.wheels.push(wheel);
    };
    return Car;
}());

function createCar(plate, brand, color) {
    car = new Car(plate, color, brand);
  //  car.addWheel(new Wheel(4, brand));
  //  document.body.innerText = "MATRICULA COCHE: " + car.plate
  //      + " COLOR: " + car.color + " MARCA: " + brand
  //      + " RUEDAS: " + JSON.stringify(car.wheels);
}
 
function addrueda(diametro,marca){
    car.addWheel(new Wheel(diametro,marca));
}

function ArrayCar(Car){
    cotxes.push(Car);
};
