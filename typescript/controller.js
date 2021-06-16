let car = Car;
function createCar(plate, brand, color) {
    car = new Car(plate, color, brand);
    car.addWheel(new Wheel(4, brand));
    document.body.innerText = "MATRICULA COCHE: " + car.plate
        + " COLOR: " + car.color + " MARCA: " + brand
        + " RUEDAS: " + JSON.stringify(car.wheels);
}
 