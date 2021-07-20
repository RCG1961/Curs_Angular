var lat, lng;

map.addEventListener('mousemove', function(ev) {
   lat = ev.latlng.lat;
   lng = ev.latlng.lng;
});

document.getElementById("transitmap").addEventListener("contextmenu", function (event) {
    // Prevent the browser's context menu from appearing
    event.preventDefault();

    // Add marker
    // L.marker([lat, lng], ....).addTo(map);
    alert(lat + ' - ' + lng);

    return false; // To disable default popup.
});

map.on("contextmenu", function (event) {
    console.log("Coordinates: " + event.latlng.toString());
    L.marker(event.latlng).addTo(map);
  });


  map.on("contextmenu", function (event) {
    console.log("user right-clicked on map coordinates: " + event.latlng.toString());
    L.marker(event.latlng).addTo(map);
  });  


  //Se añade un función que devuelve una popup con las coordenadas. Más informaciónL.Popup
 
  var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng) // Sets the geographical point where the popup will open.
        .setContent("Has hecho click en la coordenada:<br> " +  e.latlng.lat.toString() + "," +  e.latlng.lng.toString()) // Sets the HTML content of the popup.
        .openOn(map); // Adds the popup to the map and closes the previous one. 
}

map.on('click', onMapClick);