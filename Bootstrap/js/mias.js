function HabilitarMenu(){
  let clave=(document.getElementById("contrasena").value).toUpperCase();
  if (clave=='CIBERNARIUM'){
    for(let i=0; i<=5;i++) {
      label="MyElement"+i.toString();
      label2="ThisElement"+i.toString();
      document.getElementById(label).className = "dropdown nav-item nav-link";
      document.getElementById(label2).className = "dropdown-menu";
     }
     document.getElementById("login").className = "btn btn-light btn-lg hide";
     document.getElementById("logout").className = "btn btn-warning btn-lg";
     document.getElementById("buscar").className="form-control mr-sm-2";
     document.getElementById("buscar2").className="btn btn-outline-success my-2 my-sm-0";
     document.getElementById("titulo").className="navbar-brand hide";
  }   
  else{
    window.alert('Usuario no válido');
  }
}

function Cerrar(){
   for(let i=0; i<=5;i++) {
      label="MyElement"+i.toString();
      label2="ThisElement"+i.toString();
      document.getElementById(label).className = "dropdown nav-item nav-link hide";
      document.getElementById(label2).className = "dropdown-menu hide";
     }
     document.getElementById("login").className = "btn btn-light btn-lg";
     document.getElementById("logout").className = "btn btn-warning btn-lg hide"; 
     document.getElementById("buscar").className="form-control mr-sm-2 hide";
     document.getElementById("buscar2").className="btn btn-outline-success my-2 my-sm-0 hide"; 
     document.getElementById("titulo").className="navbar-brand";    
}   
  
