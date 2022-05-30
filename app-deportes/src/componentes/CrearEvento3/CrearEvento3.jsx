import '../../estilos/crear_evento3.css'
import React from 'react'


class CrearEvento3 extends React.Component {

    sendData = () => {
      var fecha_inicio = document.getElementById("fecha").value;
      var fecha_fin = document.getElementById("fecha2").value;
      var hora_inicio = document.getElementById("hora_comienzo").value;
      var hora_fin = document.getElementById("hora_fin").value;

      if(fecha_inicio === "" || fecha_fin === "" || hora_inicio === "" || hora_fin === ""){
        alert("Todos los campos son obligatorios");
      }

      this.props.data("crear_evento4", {fecha_inicio:fecha_inicio, fecha_fin:fecha_fin, hora_inicio:hora_inicio, hora_fin:hora_fin});

    }


    render() {
      
      return (

        <div>
          <div className="titulo_final">
              <h1 >¿Cuándo?</h1>
          </div>

          <div>
              <p className="subtitulo_final">Proporciona una fecha para tu evento.</p>
          </div>

          <p className="texto1">Del día</p>
          <p className="texto4">al día</p>
          <p className="texto2">desde las </p>
          <p className="texto3">hasta las</p>
          <p className="texto5">.</p>

          <input type="date" id="fecha" required></input>
          <input type="date" id="fecha2" required></input>


          <input type="time" id="hora_comienzo" min="08:00" max="21:00" required></input>
          <input type="time" id="hora_fin" min="08:00" max="21:00" required/>

          <h1 className="flecha10">←</h1>
          <button className="boton_creaevento4" onClick={this.sendData}> Guardar </button>
        </div>
      )
    }
  
  }
  
  
  
  export default CrearEvento3;