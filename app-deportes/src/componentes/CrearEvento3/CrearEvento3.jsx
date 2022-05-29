import '../../estilos/crear_evento3.css'
import React from 'react'


class CrearEvento3 extends React.Component {

    render() {
      
      return (

        <div>

            <div className="titulo_final">
                <h1 >¿Cuándo?</h1>
            </div>

            <div>
                <p className="subtitulo_final">Proporciona una fecha para tu evento.</p>
            </div>

            <p className="texto1">El día</p>
            <p className="texto2">de las </p>
            <p className="texto3">a las</p>

            <input type="date" id="fecha" value="" min="" max="" required></input>


            <input type="time" id="hora_comienzo" min="08:00" max="21:00" required></input>
            <input type="time" id="hora_fin" min="08:00" max="21:00" required></input>

            <h1 className="flecha10">←</h1>
            <button className="boton_creaevento4"> Guardar </button>


  
  
        </div>
      )
    }
  
  }
  
  
  
  export default CrearEvento3;