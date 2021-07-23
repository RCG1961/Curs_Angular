const url = 'http://127.0.0.1/mapa/api/apiRestaurants.php'

var map = L.map('mapid').on('load', onMapLoad).setView([41.400, 2.206], 11);
//map.locate({setView: true, maxZoom: 18});
	
var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);

//en el clusters almaceno todos los markers
var markers = L.markerClusterGroup();
var data_markers = [];


function onMapLoad() {
    var selector=[];
	
	console.log("Mapa cargado");
	  
	    fetch(url)
		.then (respuesta => respuesta.json())               //formato de la info
        .then (restaurante =>{
			restaurante.forEach(restaurante =>{                     
		     //console.log(restaurante.lat,restaurante.lng);       //mostramos la info de las coordenadas
			 marker=L.marker([restaurante.lat,restaurante.lng]); 
			 marker.bindPopup("<b>"+restaurante.name+"</b><br>"+restaurante.address+"<br><i style='color:#FF0000'>"+restaurante.kind_food+"</i>");
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
    /*
	FASE 3.  
		
		3) Llamo a la función para --> render_to_map(data_markers, 'all'); <-- para mostrar restaurantes en el mapa
	*/

}


function render_to_map(data_markers,filter){                      //data_markers es una array de maker+kind_food
	
    data_markers.forEach( point=>{        
		map.removeLayer(point[0]);                            //borro todo el mapa
		if(point[1]==filter || filter =="TODOS"){
		   point[0].addTo(map);
		}
	})
}