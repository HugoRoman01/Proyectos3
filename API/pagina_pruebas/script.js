$(document).ready(function(){
    
    $.get( "http://127.0.0.1:5000/", function( data ) {
        $( "#h1_name" ).html( data['message'] );
      });
  
}); 