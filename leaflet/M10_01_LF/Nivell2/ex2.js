let myMap = L.map('myMap').setView([41.38709032435462, 2.1698889166870012], 18)


L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: 'Ramon Carles ©',
maxZoom: 18
}).addTo(myMap);

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng) //las coordenadas
        .setContent("Mis coordenadas son:<br> " +  e.latlng.lat.toString() + "," +  e.latlng.lng.toString()) //abrimos popup con la info.
        .openOn(myMap); //borramos anterior popup 
    myMap.setView(e.latlng, 18)       //centrado y maximo zoom
}

myMap.on('click', onMapClick);
