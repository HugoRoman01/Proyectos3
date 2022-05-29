import '../../estilos/crear_evento.css'
import React from 'react'

class CrearEvento extends React.Component {

  
  
    render() {
      
      return (

        <div>

            <div className="titulo_crear_evento1">
                <h1 >¿A qué quieres jugar?</h1>
            </div>
    
            <select className="input_deporte">
                <option value="Baloncesto">Baloncesto</option>
                <option value="Fútbol">Fútbol</option>
                <option value="Pádel">Pádel</option>
            </select>

            <h1 className="flecha8">→</h1>
  
  
        </div>
      )
    }
  
  }
  
  
  
  export default CrearEvento;