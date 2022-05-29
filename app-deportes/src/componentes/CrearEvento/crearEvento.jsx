import '../../estilos/crear_evento.css'
import React from 'react'

class Bienvenida extends React.Component {

  
  
    render() {
      
      return (

        <div>

            <div class="titulo_crear_evento1">
                <h1 >¿A qué quieres jugar?</h1>
            </div>
    
            <select class="input_deporte">
                <option value="Baloncesto">Baloncesto</option>
                <option value="Fútbol">Fútbol</option>
                <option value="Pádel">Pádel</option>
            </select>
  
  
  
        </div>
      )
    }
  
  }
  
  
  
  export default CrearEvento;