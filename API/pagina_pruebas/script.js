$(document).ready(function(){
    
  if($.cookie('access_token')!=null){
    // Si el usuario ya está logeado pide la informacion de este
    var access_token = $.cookie('access_token');

    /*
    $.ajax({
      url: 'http://127.0.0.1:5000/api/getUser',
      type: 'GET',
      data: {"jwt":access_token},
    }).done(function(data){
      if(data['status']=='OK'){
        $("#h1_user").html(data['nombre_completo']);
      }
      console.log(data)
    });
  */
    $.get("http://127.0.0.1:5000/api/getUser", {'jwt':access_token}, function(data){
      if(data['status']=='OK'){
        $("#h1_name").html(data['nombre_completo']);
      }
    });
    
  }


  $('#btn_login').click(function(){
    var email = $('#login_email').val();
    var password = $('#login_password').val();
    $.post( "http://127.0.0.1:5000/api/login", {'email':email,'password':password} ,function( data ) {
        
      if(data['status'] == 'OK'){
        $.cookie('access_token', data['access_token']);
        $("#h1_name").html("Bienvenido, " + data['nombre_completo']);
        console.log(data);
      }else if(data['status'] == 'ERROR'){
        $("#login_div").html(data['message']);
      }else{
        console.log("ERROR EN EL SERVIDOR")
      }
      
      //$( "#h1_name" ).html( data['message'] );
      console.log(data)
    });
  });


  $('#btn_registro').click(function(){
  
    var nombre_completo = $('#nombre_completo').val();
    var email = $('#email').val();
    var password = $('#password').val();
    var matriculacion = $('#matriculacion').val();

    var paquete = {'nombre_completo':nombre_completo,'email':email,'password':password,'matriculacion':matriculacion};

    $.post( "http://127.0.0.1:5000/api/registro", paquete, function(data){
      if(data['status'] == 'OK'){
        $("#login_div").html(data);
        console.log(data);
      }else if(data['status'] == 'ERROR'){
        $("#login_div").html(data['message']);
      }else{
        console.log("ERROR EN EL SERVIDOR")
        $("#login_div").html("ERRROR EN EL SERVIDOR");
      }
      console.log(data)
    });
    

  });
  
}); 