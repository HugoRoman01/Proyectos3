import axios from "axios";
import React from "react";
import "../../estilos/home.css";

class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            user: this.props.user,
            token: this.props.token,
            eventos: []
        }
    }

    componentDidMount() {

        var url = "http://127.0.0.1:5000/api/eventos/getEventos";
        axios.get(url).then (res => {

            this.setState({
                user: this.state.user,
                token: this.state.token,
                eventos: res.data
            })
        });

    }

    sendDataHome = () => {
        this.props.AppData("home");
    }

    sendDataUser = () => {
        this.props.AppData("usuario");
    }

    sendDataCrear = () => {
        this.props.AppData("crear_evento");
    }

    sendDataMisEventos = () => {
        this.props.AppData("mis_eventos");
    }
    
    render() {
        return (
            <nav >
                <input type="checkbox" id="menu" />
                <label htmlFor="menu" className="icono"> ☰ </label>
                <ul>
                    <li onClick={this.sendDataHome}>☎ Home</li>
                    <li onClick={this.sendDataUser}>♕ Mi Perfil</li>
                    <li onClick={this.sendDataCrear}>✚ Crear Evento</li>
                    <li className="last" onClick={this.sendDataMisEventos}>☑ Mis Eventos</li>
                </ul>
                <h1>Bienvenido, {this.state.user.nombre}</h1>
            </nav>
        )
    }   
}

export default Home;