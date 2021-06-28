let car: Car;
let coches:Car[] = [];
let global:any;

function createCar(plate:string,brand:string,color:string){
    car=new Car(plate,color,brand);
   // car.addWheel(new Wheel(4,brand));
}

window.addEventListener("load",function(){
  const form_car = document.querySelector('.formulario') as HTMLFormElement;
  form_car.addEventListener("submit",validarFormulario);
    (<HTMLSelectElement>document.getElementById("errorMatricula")).innerHTML= "";
});

function validarFormulario(e:Event){
        
    e = e || window.event;   
    //const form_car2 = window.querySelector('.formulario') as HTMLFormElement;
    let expresion:string = window.formulario.matricula.value.toUpperCase();
   
    var regular:any = /^[0-9]{4}[A-Z]{3}/;                 //formato matricula 4 numeros y 3 letras
    if(!regular.test(expresion)){
      e.preventDefault();
      (<HTMLSelectElement>document.getElementById("errorMatricula")).innerHTML = "Pon 4 numeros y 3 letras";
      (<HTMLSelectElement>document.getElementById("errorMatricula")).setAttribute("style","color:red;");
    } 
    else{
        let uno  = (<HTMLInputElement>document.getElementById("matricula")).value.toUpperCase();
        let dos  = (<HTMLInputElement>document.getElementById("marca")).value.toUpperCase();
        let tres  = (<HTMLInputElement>document.getElementById("color")).value.toUpperCase();
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
        
        let y1:string = (<HTMLInputElement>document.getElementById("r1")).value;
        let y2:string = (<HTMLInputElement>document.getElementById("r2")).value;
        let y3:string = (<HTMLInputElement>document.getElementById("r3")).value;
        let y4:string = (<HTMLInputElement>document.getElementById("r4")).value;
        let yy1:number = parseFloat(y1);
        let yy2:number = parseFloat(y2);
        let yy3:number = parseFloat(y3);
        let yy4:number = parseFloat(y1);
        
        if(yy1<.4 || yy1>2){
          alert('El diámetre de la roda 1 no es correcta. '+y1+'\nEls valors tenen que estar entre 0.4 i 2');
        }
        else if(yy2<.4 || yy2>2){
          alert('El diámetre de la roda fa-stack-2x no es correcta. '+y2+'\nEls valors tenen que estar entre 0.4 i 2');
        }
        else if(yy3<.4 || yy3>2){
          alert('El diámetre de la roda 3 no es correcta. '+y3+'\nEls valors tenen que estar entre 0.4 i 2');
        }
        else if(yy4<.4 || yy4>2){
          alert('El diámetre de la roda 4 no es correcta. '+y4+'\nEls valors tenen que estar entre 0.4 i 2');
        }
        else{ 
          if(isNaN(yy1||yy2||yy3||yy4)){    
            alert('Error en los datos hay algun campo en blanco')
          }
          else{
            (<HTMLSelectElement>document.getElementById("uno")).innerHTML = 'Rueda 1 fabricante:'+x1+'   Diámetro: '+y1+'         Rueda 2 fabricante:'+x2+'   Diámetro: '+y2;
            (<HTMLSelectElement>document.getElementById("dos")).innerHTML='Rueda 3 fabricante:'+x3+'   Diámetro: '+y3+'         Rueda 2 fabricante:'+x4+'   Diámetro: '+y4;
            car.addWheel(new Wheel(yy1,x1));
            car.addWheel(new Wheel(yy2,x2));
            car.addWheel(new Wheel(yy3,x3));
            car.addWheel(new Wheel(yy4,x4));
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