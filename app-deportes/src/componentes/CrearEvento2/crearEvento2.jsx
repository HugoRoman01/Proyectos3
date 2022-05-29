import '../../estilos/crear_evento2.css'
import React from 'react'

class CrearEvento2 extends React.Component {

    sendDataBack = () => {
        this.props.data("crear_evento")
    }

    sendData = () => {
        
        var nombre_evento = document.getElementById("input3").value
        var descripcion = document.getElementById("input4").value
        var numero_jugadores = document.getElementById("input5").value

        if (nombre_evento === "" || numero_jugadores === "") {
            alert("Rellena todos los campos")
            return
        }

        if (numero_jugadores > 20) {
            alert("El número de jugadores no puede ser mayor de 20")
            return
        }

        this.props.data("crear_evento3", {nombre_evento: nombre_evento, descripcion: descripcion, numero_jugadores: numero_jugadores});

    }
  
  
    render() {
      
      return (

        <div>

            <div className="bloque1">
                <div className="bloque1.1">
                    <h1 className="titulo" id="titulo1"> Nombra tu evento </h1>
                    <h1 className="asterisco">*</h1>
                </div>
                <p className="subtitulo">¿Cómo se titula la actividad?</p>
                <input id="input3" className="input-actividad" placeholder="Torneo de pádel, pachanga..."/>
            </div>


            <div className="bloque2">
                <h1 id="titulo2"> Añade una breve descripción</h1>
                <p className="subtitulo2">Le proporcionará más información a tus compañeros.</p>

                <input id="input4" className="input-actividad" placeholder="Descripción del evento..."/>
            </div>


            <div className="bloque3">
                <h1 id="titulo3">¿Cuántos jugadores seréis?</h1>
                <h1 className="asterisco2" id="asterisco2">*</h1>
                <p className="subtitulo3">Introduce un número. Máximo 20 jugadores..</p>

                <input id="input5" className="input-actividad" placeholder="1, 2, 10 ..."/>
            </div>

            <div className="flechas">
                <h1 className="flecha5" onClick={this.sendData}>→</h1>
                <h1 className="flecha6" onClick={this.sendDataBack}>←</h1>
            </div>
  
  
        </div>
      )
    }
  
  }
  
  
  
  export default CrearEvento2;