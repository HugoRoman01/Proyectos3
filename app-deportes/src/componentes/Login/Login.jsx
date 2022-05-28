import React from "react";
import '../../estilos/login.css'





class Login extends React.Component {

  sendDataLogin = () => {
    this.props.AppData('login');
  }

  sendDataRegister = () => {
    this.props.AppData('register_email');
  }

  render() {

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

      <button class="boton_login" onClick={this.sendDataLogin}>Iniciar sesión</button>

      <div class="veremos_login">
        <p class="subtitulo1_login">¿No tienes cuenta todavía? </p>
        <p class="crear-cuenta_login" onClick={this.sendDataRegister}>Crear cuenta</p>
      </div>

      <div>
        <p class="subtitulo2_login">¿Has olvidado tu contraseña?</p>
      </div>

    </div>
  );
}
}

export default Login;
