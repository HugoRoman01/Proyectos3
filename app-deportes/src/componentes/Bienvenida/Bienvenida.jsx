import '../../estilos/bienvenida.css'
import React from 'react'
import Cookies from 'universal-cookie'

class Bienvenida extends React.Component {

  constructor(props) {
    super(props);
    this.sendData = this.sendData.bind(this);

    const cookie = new Cookies();
    if (cookie.get('access_token')){
      this.props.AppData('cookieLogin');
    }
  }


  sendData = () => {
    this.props.AppData("login");
  }

  render() {
    
    return (
    <div>

      <div className="titulo_bienvenida">
        <h1 >¡Bienvenido/a!</h1>
      </div>

      <div>
        <p className="subtitulo_bienvenida"> La comunidad deportiva de U-Tad, donde podrás crear torneos y participar en eventos deportivos creados por los alumnos del centro.</p>
      </div>

      <button className="boton_bienvenida" onClick={this.sendData}> <p className="txt_button_bienvenida">Acceder ahora</p> </button>

      <div className="imagen2-div_bienvenida"></div>
      <div className="imagen1-div_bienvenida"></div>
    </div>
    )
  }

}



export default Bienvenida;
