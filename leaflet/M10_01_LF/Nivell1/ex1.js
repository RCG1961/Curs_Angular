let myMap = L.map('myMap').setView([41.38709032435462, 2.1698889166870012], 18)


L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: 'Ramon Carles ©',
maxZoom: 18
}).addTo(myMap);



let marker = L.marker([41.38701912754606, 2.166044397638506 ])
marker.bindPopup("<b>Restaurant Centfocs</b><br>Restaurante mediterraneo <br> Carrer Balmes, 16, 08007 Barcelona").openPopup();

marker.addTo(myMap)
