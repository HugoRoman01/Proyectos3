import React from "react";
import '../../../estilos/eventoinfo.css';


class EventoInfo extends React.Component {

    render() {
        var evento = {
            id_evento: 1,
            id_usuario: 1,
            id_deporte: 1,
            max_participantes: 10,
            nombre_evento: "Torneo de Padel",
            fecha_inicio: "2020-01-01",
            fecha_fin: "2020-01-02",
            hora_inicio: "12:00",
            hora_fin: "13:00"
        };

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
                    <input type="checkbox" id="menu" />
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
                <div className="eventosub">Vamos a hacer un torneo entre alumnos de la U-tad, teneis mas info abajo, animaos a participar!</div>
                <div className="eventoinfo1">
                    Creado por: {evento.id_usuario}
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