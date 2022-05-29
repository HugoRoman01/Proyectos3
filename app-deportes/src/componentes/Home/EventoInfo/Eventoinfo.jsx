import React from "react";
import '../../../estilos/eventoinfo.css';


class EventoInfo extends React.Component {

render() {
    return (
        <nav >
            <input type="checkbox" id="menu" />
            <label for="menu" className="icono_eventoinfo"> ☰ </label>
            <ul>
                <li onClick={this.sendDataHome}>☎ Home</li>
                <li onClick={this.sendDataUser}>♕ Mi Perfil</li>
                <li onClick={this.sendDataCrear}>✚ Crear Evento</li>
                <li className="last_eventoinfo" onClick={this.sendDataMisEventos}>☑ Mis Eventos</li>
            </ul>
        </nav>
    )
}   

}
export default EventoInfo;