import React from "react";
import '../../../estilos/eventoinfo.css';


class EventoInfo extends React.Component {

    sendDataHome = () => {
        this.props.data("home")
    }

    sendDataUser = () => {
        this.props.data("usuario")
    }

    sendDataCrear = () => {
        this.props.data("crear_evento")
    }

    sendDataMisEventos = () => {
        this.props.data("mis_eventos")
    }

    sendDataUnirse = () => {
        this.props.data("inscribirse", this.props.evento.id_evento)
    }

    render() {
        var evento = this.props.evento

        switch (evento.id_deporte) {
            case 1:
                evento.id_deporte = "Padel";
                break;
            case 2:
                evento.id_deporte = "Futbol";
                break;
            case 3:
                evento.id_deporte = "Basket";
                break;
            default:
                break;
        }

        return (
            <div>
            <div className="menuhamburguesa">
                <nav >
                    <input type="checkbox" id="menu" className="check_eventoinfo" />
                    <label for="menu" className="icono_eventoinfo"> ☰ </label>
                    <ul>
                        <li onClick={this.sendDataHome}>☎ Home</li>
                        <li onClick={this.sendDataUser}>♕ Mi Perfil</li>
                        <li onClick={this.sendDataCrear}>✚ Crear Evento</li>
                        <li className="last_eventoinfo" onClick={this.sendDataMisEventos}>☑ Mis Eventos</li>
                    </ul>
                </nav>
            </div>
            <div className="all">
                <div className="eventobanner">
                    <div className="eventotitulo"> {evento.nombre_evento} </div>
                    <div className="eventofecha"> {evento.fecha_inicio} - {evento.fecha_fin} </div>
                </div>
                <div className="eventosub">{evento.descripcion_evento}</div>
                <div className="eventoinfo1">
                    Creado por: {evento.user_creador}
                    <br />
                    Deporte: {evento.id_deporte}
                    <br />
                    Asistiran: {evento.max_participantes} personas
                    <br />
                </div>
                <div className="eventoinfo2">
                    Lugar: Canchas U-tad
                    <br />
                    Fecha: Dia {evento.fecha_inicio}
                    <br />
                    Hora: De {evento.hora_inicio} a {evento.hora_fin}
                </div>
                <div className="boton">
                    <button className="botonunirse" onClick={this.sendDataUnirse}>Unirse</button>
                </div>
            </div>
            </div>
        )
    }   

}
export default EventoInfo;