import '../../estilos/bienvenida.css'
import React from 'react'

class Bienvenida extends React.Component {

  sendData = () => {
    this.props.AppData("login");
  }

  render() {
    
    return (
    <div>

      <div class="titulo_bienvenida">
        <h1 >¡Bienvenido/a!</h1>
      </div>

      <div>
        <p class="subtitulo_bienvenida"> La comunidad deportiva de U-Tad, donde podrás crear torneos y participar en eventos deportivos creados por los alumnos del centro.</p>
      </div>

      <button class="boton_bienvenida" onClick={this.sendData}> <p class="txt_button_bienvenida">Acceder ahora</p> </button>

      <div class="imagen2-div_bienvenida"></div>
      <div class="imagen1-div_bienvenida"></div>
    </div>
    )
  }

}



export default Bienvenida;
