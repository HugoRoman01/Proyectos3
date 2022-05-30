import React from "react";
import '../../../estilos/homeprueba.css';


class HomePrueba extends React.Component {
    
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

    sendDataVerEvento = (id_evento) => {
        this.props.data("ver_evento", id_evento)
    }

    sendDataInscribirse = (id_evento) => {
        this.props.data("inscribirse", id_evento)
    }

    render() {

        
        const eventos = this.props.eventos.map((evento, key) => {
            let id_evento = "evento-" + key;
            let id_button = "button-" + key; 
            return (
                <div className="eventotarjeta" id={id_evento} key={id_evento} onClick={ () => {this.sendDataVerEvento(key)}}>
                    <div className="fecha"> {evento.fecha_inicio} <button className="botonhomeprueba" id={id_button} onClick={ () => {this.sendDataInscribirse(evento.id_evento)}}>Unirse</button></div>
                    <div className="nombre"> {evento.nombre_evento}:  {evento.max_participantes} participantes  </div>
                    <div className="hora">{evento.hora_inicio}</div>
                </div>
            );
        });


        return (
            <div>
                <div className="menuhamburguesa">
                    <nav >
                        <input type="checkbox" id="menu" className="check_homeprueba"/>
                        <label htmlFor="menu" className="icono_homeprueba"> ☰ </label>
                        <ul>
                            <li onClick={this.sendDataHome}>☎ Home</li>
                            <li onClick={this.sendDataUser}>♕ Mi Perfil</li>
                            <li onClick={this.sendDataCrear}>✚ Crear Evento</li>
                            <li className="last_homeprueba" onClick={this.sendDataMisEventos}>☑ Mis Eventos</li>
                        </ul>
                    </nav>
                </div>
                <div className="name"> ¡Hola, {this.props.nombre} !</div>
                <div className="texto"> Estos eventos podrian interesarte: </div>
                {eventos}

            </div>
                
        );
    }
}

export default HomePrueba;