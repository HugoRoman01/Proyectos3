import axios from "axios";
import React from "react";
import "../../estilos/home.css";

var usuairo;
var token;

class Home extends React.Component {

    constructor(props) {
        super(props);

        // llamo a la API para obtener los eventos que hay creados
        let url = "http://localhost:8080/api/eventos/getEventos";
           
        axios.get(url).then(response => {
            
            this.state = {
                user: props.user,
                token: props.token,
                eventos: response.data
            }


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
                <label for="menu" className="icono"> ☰ </label>
                <ul>
                    <li onClick={this.sendDataHome}>☎ Home</li>
                    <li onClick={this.sendDataUser}>♕ Mi Perfil</li>
                    <li onClick={this.sendDataCrear}>✚ Crear Evento</li>
                    <li className="last" onClick={this.sendDataMisEventos}>☑ Mis Eventos</li>
                </ul>
            </nav>
        )
    }   
}

export default Home;