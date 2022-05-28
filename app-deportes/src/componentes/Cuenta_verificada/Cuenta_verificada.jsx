import React from "react";
import '../../estilos/cuenta_verificada.css'


 
class Cuenta_verificada extends React.Component {

  sendData = (accion) => {
    this.props.AppData(accion);
  }

  render() {

  return (
    <div>

      <div class="titulo_verificada">
        <h1 >Tu cuenta ha sido verificada.</h1>
      </div>

      <div>
        <p class="subtitulo_verificada">Inicia sesión para acceder a la comunidad.</p>
      </div>

      <button class="boton_verificada" onClick={this.sendData('login')}>¡Vamos a ello!</button>
    </div>
  );
}
}

export default Cuenta_verificada;
