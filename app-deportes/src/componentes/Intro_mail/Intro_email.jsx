import React from "react";
import '../../estilos/intro_email.css'


class Intro_email extends React.Component {

   
  sendData = (accion) => {
    this.props.AppData(accion);
  }

  
  render() {

  return (
    <div>
      <div class="titulo_email">
        <h1 >Estás a punto de formar parte de una gran<br />comunidad.</h1>
      </div>

      <div>
        <p class="subtitulo_email">Introduce el correo electrónico de U-Tad</p>
      </div>

      <div>
        <input type="mail" class="input-mail_email" placeholder="Correo electrónico"/>
      </div>

      <div>
      <h1 class="flecha_password" onClick={this.sendData('intro_contrasenia')}>→</h1>
      </div>
    </div>
  );
}
}

export default Intro_email;
