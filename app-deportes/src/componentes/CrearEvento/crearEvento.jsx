import '../../estilos/crear_evento.css'
import React from 'react'

class CrearEvento extends React.Component {

    sendData = () => {
      var id_deporte = document.getElementsByClassName("input_deporte")[0].value
      this.props.data("crear_evento2", id_deporte);
    }
  
    render() {
      
      return (

        <div>

            <div className="titulo_crear_evento1">
                <h1 >¿A qué quieres jugar?</h1>
            </div>
    
            <select className="input_deporte">
                <option value="1">Baloncesto</option>
                <option value="2">Fútbol</option>
                <option value="3">Pádel</option>
            </select>

            <h1 className="flecha8" onClick={this.sendData}>→</h1>
  
  
        </div>
      )
    }
  
}
  
  
  
  export default CrearEvento;