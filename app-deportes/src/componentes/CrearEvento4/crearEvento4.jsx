import '../../estilos/crear_evento4.css'
import calendario from '../../imagenes/calendario.png'
import React from 'react'

class CrearEvento4 extends React.Component {

    sendDataHome = () => { this.props.data("home") }
    sendDataEvento = () => { this.props.data("evento_preview") }

    render() {
      
      return (

        <div>

            
            <div className="titulo_creaevento3">
                <h1>¡El evento ha sido creado con éxito!</h1>
            </div>

            <div>
                <p className="subtitulo_creaevento3">Te lo recordaremos cuando se acerque la fecha.</p>
            </div>

            <button className="boton_creaevento3"> Volver al inicio </button>
            <button className="boton_creaevento3_2"> Ir al evento</button>

            <img src={calendario} alt="Calendario img"/>
            
        </div>
      )
    }
  
  }
  
  
  
  export default CrearEvento4;