var map = L.map('mapid').on('load', onMapLoad).setView([41.400, 2.206], 12);
//map.locate({setView: true, maxZoom: 18});
	
var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);

//en el clusters almaceno todos los markers
var markers = L.markerClusterGroup();
var data_markers = [];


function onMapLoad() {
    var puntos=[];
	console.log("Mapa cargado");
		var url = 'http://127.0.0.1/mapa/api/apiRestaurants.php'
		//var url = 'datos.json';
		fetch(url)
		.then (respuesta => respuesta.json())               //formato de la info
        .then (restaurante =>{
			restaurante.forEach(restaurante =>{                     
		     console.log(restaurante.lat,restaurante.lng);       //mostramos la info de las coordenadas
			 marker=L.marker([restaurante.lat,restaurante.lng]); 
			 marker.bindPopup("<b>"+restaurante.name+"</b><br>"+restaurante.address+"<br><i style='color:#FF0000'>"+restaurante.kind_food+"</i>");
			 marker.addTo(map);
			})        
		}); 
    /*
	FASE 3.  
		1) Relleno el data_markers con una petición a la api
		2) Añado de forma dinámica en el select los posibles tipos de restaurantes
		3) Llamo a la función para --> render_to_map(data_markers, 'all'); <-- para mostrar restaurantes en el mapa
	*/

}

$('#kind_food_selector').on('change', function() {
  console.log(this.value);
  render_to_map(data_markers, this.value);
});



function render_to_map(data_markers,filter){
	
	/*
	FASE 3.2
		1) Limpio todos los marcadores
		2) Realizo un bucle para decidir que marcadores cumplen el filtro, y los agregamos al mapa
	*/	
			
}