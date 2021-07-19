var index=-1;
var index2=0;

$(document).ready(function () {
    $('#leerjoke').click(function (e) { 
        e.preventDefault();
        $('#chiste').html('');
        $.get("random.json",function(data){
           // console.log(data);
           // console.log (data.length);                      // randon de chistes de Chuck Norris
            if(index===-1){
                joke= (data[0].value.joke)
                $(".alert-primary").css("display", "block");
                $('#chiste').html(joke).html()
                index=data.length-1;
                index=0;
            }
            else{
                index =Math.floor(Math.random() * data.length);
                while(index2 === index) {
                    index =Math.floor(Math.random() * data.length);
                }
                index2=index;
                joke= (data[index].value.joke)
                $(".alert-primary").css("display", "block");
                $('#chiste').html("Joke nº "+index+"<br>"+joke).html() 
            }
        });
    });
    $('#jokeapi').click(function (e) { 
        e.preventDefault();
        $('#chiste').html('');
        $.get("http://api.icndb.com/jokes/random?",function(data){
            //console.log(data);
            //console.log(data.value.joke)
            $(".alert-primary").css("display", "block");
            $('#chiste').html("Joke de la API"+"<br>"+data.value.joke).html() 
      });
    });
    $('#jokefetch').click(function (e) { 
        e.preventDefault();
        $('#chiste').html('');
        $(".alert-primary").css("display", "block");
        fetch('http://api.icndb.com/jokes/random?')
        .then(response => response.json())
        .then(data => ($('#chiste').html("Joke amb fetch"+"<br>"+data.value.joke).html()) );
    });    
});