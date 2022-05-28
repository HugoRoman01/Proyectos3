import React from "react";
import '../../estilos/link_verificacion.css'


 
class Link_verificacion extends React.Component {

  
sendData = () => {
  this.props.AppData('link_verificacion');
}

  render() {

  return (
    <div>

      <div class="titulo_link">
        <h1 >Has recibido un link de verificación a </h1>
      </div>

      <div>
        <p class="subtitulo_link">textodeprueba@live.u-tad.com</p>
      </div>

      <div class="conjunto_link">
        <p class="llegado_link">¿No te ha llegado ningún correo?</p>
        <p class="Reenviar_link" onClick={this.sendData}>Reenviar.</p>
      </div>

    </div>
  );
}
}

export default Link_verificacion;
