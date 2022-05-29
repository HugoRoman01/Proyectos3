import React from "react";
import '../../estilos/link_verificacion.css'


 
class RegisterLinkVerificacion extends React.Component {

  
sendData = () => {
  this.props.AppData('link_verificacion');
}

  render() {

  return (
    <div>

      <div class="titulo_link">
        <h1 >Has recibido un correo de verificación a </h1>
      </div>

      <div>
        <p class="subtitulo_link">{this.props.email}</p>
      </div>

      <div class="conjunto_link">
        <p class="llegado_link">¿No te ha llegado ningún correo?</p>
        <p class="Reenviar_link" onClick={this.sendData}>Reenviar.</p>
      </div>

    </div>
  );
}
}

export default RegisterLinkVerificacion;
