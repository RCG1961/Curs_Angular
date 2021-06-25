let car: Car;
let coches: Array<Car>;
let global:any;

function createCar(plate:string,brand:string,color:string){
    car=new Car(plate,color,brand);
    car.addWheel(new Wheel(4,brand));
    document.body.innerText="MATRICULA COCHE: " + car.plate 
    + " COLOR: " +car.color + " MARCA: " + brand 
    + " RUEDAS: " + JSON.stringify(car.wheels);
}

window.addEventListener("load",function(){
  document.formulario.addEventListener("submit",validarFormulario);
    (<HTMLSelectElement>document.getElementById("errorMatricula")).innerHTML= "";
});

function validarFormulario(e:KeyboardEvent){
        
    e = e || window.event;   
    let expresion:string = window.formulario.matricula.value.toUpperCase();
   
    var regular:any = /^[0-9]{4}[A-Z]{3}/;                 //formato matricula 4 numeros y 3 letras
    if(!regular.test(expresion)){
      e.preventDefault();
      (<HTMLSelectElement>document.getElementById("errorMatricula")).innerHTML = "Pon 4 numeros y 3 letras";
      (<HTMLSelectElement>document.getElementById("errorMatricula")).setAttribute("style","color:red;");
    }
    else{
        let uno:string = window.formulario.matricula.value.toUpperCase();  
        let dos:string = window.formulario.marca.value.toUpperCase(); 
        let tres:string = window.formulario.color.value.toUpperCase(); 
        console.log ('matricula: '+uno+' marca: '+dos+' color: '+tres);
        createCar(uno,dos,tres);
        coches.push(car);   

        global = (<HTMLSelectElement>document.getElementById("midiv")).innerHTML;
        (<HTMLSelectElement>document.getElementById("final")).style.opacity="0";
        (<HTMLSelectElement>document.getElementById("myFrame")).style.opacity ="1";
        (<HTMLSelectElement>document.getElementById("noucotxe")).innerText ='COCHE==> '+'matricula: '+car.plate+'  color: '+car.color+' fabricante: '+car.brand;
        (<HTMLSelectElement>document.getElementById("midiv")).innerHTML='';
    }
  } 

  function Rodes(){

        let x1:string = (<HTMLInputElement>document.getElementById("m1")).value.toUpperCase();
        let x2:string = (<HTMLInputElement>document.getElementById("m2")).value.toUpperCase();
        let x3:string = (<HTMLInputElement>document.getElementById("m3")).value.toUpperCase();
        let x4:string = (<HTMLInputElement>document.getElementById("m4")).value.toUpperCase();
        
        let y1:any = parseFloat((<HTMLInputElement>document.getElementById("r1")).value).toFixed(2);
        let y2:any = parseFloat((<HTMLInputElement>document.getElementById("r2")).value).toFixed(2);
        let y3:any = parseFloat((<HTMLInputElement>document.getElementById("r3")).value).toFixed(2);
        let y4:any = parseFloat((<HTMLInputElement>document.getElementById("r4")).value).toFixed(2);
        
        if(y1<.4 || y1>2){
          alert('El diámetre de la roda 1 no es correcta. '+y1+'\nEls valors tenen que estar entre 0.4 i 2');
        }
        else if(y2<.4 || y2>2){
          alert('El diámetre de la roda fa-stack-2x no es correcta. '+y2+'\nEls valors tenen que estar entre 0.4 i 2');
        }
        else if(y3<.4 || y3>2){
          alert('El diámetre de la roda 3 no es correcta. '+y3+'\nEls valors tenen que estar entre 0.4 i 2');
        }
        else if(y4<.4 || y4>2){
          alert('El diámetre de la roda 4 no es correcta. '+y4+'\nEls valors tenen que estar entre 0.4 i 2');
        }
        else{ 
          if(isNaN(y1||y2||y3||y4)){    
            alert('Error en los datos hay algun campo en blanco')
          }
          else{
            (<HTMLSelectElement>document.getElementById("uno")).innerHTML = 'Rueda 1 fabricante:'+x1+'   Diámetro: '+y1+'         Rueda 2 fabricante:'+x2+'   Diámetro: '+y2;
            (<HTMLSelectElement>document.getElementById("dos")).innerHTML='Rueda 3 fabricante:'+x3+'   Diámetro: '+y3+'         Rueda 2 fabricante:'+x4+'   Diámetro: '+y4;
          car.addWheel(y1,x1);
          car.addWheel(y2,x2);
          car.addWheel(y3,x3);
          car.addWheel(y4,x4);
          (<HTMLSelectElement>document.getElementById("final")).style.opacity="1";
          }
        }
    
  }

function Repetir(){
  (<HTMLSelectElement>document.getElementById("midiv")).innerHTML = global;
  (<HTMLSelectElement>document.getElementById("final")).style.opacity="0";
  (<HTMLSelectElement>document.getElementById("myFrame")).style.opacity="0";
  (<HTMLSelectElement>document.getElementById("midiv")).style.opacity="1";
}