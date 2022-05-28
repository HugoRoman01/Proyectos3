import React from "react";
import '../../estilos/login.css'
 


function Login() {


  return (
    <div>

      <div class="titulo_login">
        <h1 >¡Te esperamos al otro lado!</h1>
      </div>

      <div>
        <input type="mail" id="input1_login" class="input-email_login" placeholder="Correo electrónico"/>
      </div>

      <div>
        <input type="mail" id="input2_login" class="input-contra_login" placeholder="Contraseña"/>
      </div>

      <button class="boton_login">Iniciar sesión</button>

      <div class="veremos_login">
        <p class="subtitulo1_login">¿No tienes cuenta todavía? </p>
        <p class="crear-cuenta_login">Crear cuenta</p>
      </div>

      <div>
        <p class="subtitulo2_login">¿Has olvidado tu contraseña?</p>
      </div>

    </div>
  );
}

export default Login;
