const url = 'http://127.0.0.1/mapa/api/apiRestaurants.php'

var map = L.map('mapid').on('load', onMapLoad).setView([41.400, 2.206], 11);
CentrarGPS();
//map.locate({setView: true, maxZoom: 18});
	
var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);

//en el clusters almaceno todos los markers
var markers,mymarker = L.markerClusterGroup();
var data_markers = [];


function onMapLoad() {
    var selector=[];
	
	console.log("Mapa cargado");
	  
	    fetch(url)
		.then (respuesta => respuesta.json())               //formato de la info
        .then (restaurante =>{
			restaurante.forEach(restaurante =>{                     
		     //console.log(restaurante.lat,restaurante.lng);       //mostramos la info de las coordenadas =w408-h272
			 marker=L.marker([restaurante.lat,restaurante.lng]); 
			 marker.bindPopup("<img src='"+restaurante.photo+"' width='204' height='136'</img><br>"+"<b>"+restaurante.name+"</b><br>"+restaurante.address+"<br><i style='color:#FF0000'>"+restaurante.kind_food+"</i>");
			 marker.addTo(map);
			 //console.log(marker,restaurante.kind_food);
			 restaurant=[];
			 restaurant=[marker,restaurante.kind_food];
			 data_markers.push(restaurant);
			                // cargar selector de restaurantes
			 if(!selector.includes(restaurante.kind_food)){                     // solo coge los que son distintos
				selector.push(restaurante.kind_food);
				//console.log(restaurante.kind_food)
				$('#kind_food_selector').append('<option>'+restaurante.kind_food+'</option>');
			 }			 
			}) 
		}); 
		              
		$('#kind_food_selector').on('change', function() {
			//console.log(this.value);
			render_to_map(data_markers,this.value);
		  });
   
}


function render_to_map(data_markers,filter){                      //data_markers es una array de maker+kind_food
	map.removeLayer(mymarker); 	
    data_markers.forEach( point=>{        
		map.removeLayer(point[0]);                            //borro todo el mapa
		if(point[1]==filter || filter =="TODOS"){
		   point[0].addTo(map);
		}
	})
	CentrarGPS();
}

function CentrarGPS() {
	if(navigator.geolocation) {
	  navigator.geolocation.getCurrentPosition(posicion_actual);
	 } else {
	   alert("El navegador no soporta el API de geolocalización. Actualizar a un navegador más moderno.");
	 }
  }

function posicion_actual( position ) {
	var crds = position.coords;
	//console.log(crds);
	var greenIcon = L.icon({
		iconUrl: 'icono.png'		
	})
	mymarker = new L.Marker([crds.latitude,crds.longitude],{icon: greenIcon})
	mymarker.bindPopup("Mis coordenadas son:<br> " +  crds.latitude.toString() + "," +  crds.longitude.toString()) //abrimos popup con la info.    
	mymarker.addTo(map)
	map.setView([crds.latitude,crds.longitude], 10)       //centrado y maximo zoom
		
    //    mymarker.addTo(map) 
}