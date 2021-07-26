function iniciarMap(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
          var geolocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
          };
          console.log(geolocation);
          var map = new google.maps.Map(document.getElementById('map'),{
            zoom: 12,
            center: geolocation
          });
          var marker = new google.maps.Marker({
            position: geolocation,
            map: map
          });
          var circle = new google.maps.Circle(
              { center: geolocation, radius: position.coords.accuracy });
          autocomplete.setBounds(circle.getBounds());
      });
   }
   else {alert('Geolocalizacion bloqueada');}

                       // nova busqueda
 //  navigator.geolocation.watchPosition(function(position) {
 //   var nova = {
  //      lat: position.coords.latitude,
  //      lng: position.coords.longitude
 //   };
  //  var map1 = new google.maps.Map(document.getElementById('map1'),{
  //    zoom: 10,
   //   center: nova
   // });
    //var marker1 = new google.maps.Marker({
   //     position: nova,
   //     map1: map1
   // });
   // var circle1 = new google.maps.Circle(
   //       { center: nova, radius: position.coords.accuracy });
   // autocomplete.setBounds(circle1.getBounds());
   
}


