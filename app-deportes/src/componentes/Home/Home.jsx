import axios from "axios";
import React from "react";
import "../../estilos/home.css";
import HomePrueba from "./HomePrueba/HomePrueba";
import User from "./User/User";
import CrearEvento from "../CrearEvento/CrearEvento";
import CrearEvento2 from "../CrearEvento2/CrearEvento2";
import CrearEvento3 from "../CrearEvento3/CrearEvento3";
import CrearEvento4 from "../CrearEvento4/CrearEvento4";


class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            user: this.props.user,
            token: this.props.token,
            eventos: [],
            page: "home"
        }
    }

    callbackFunction = (data, parametros) => {
        if (data === "home") {
            this.setState({
                user: this.state.user,
                token: this.state.token,
                eventos: this.state.eventos,
                page: "home",
            })
        }else if(data === "usuario"){
            this.setState({
                user: this.state.user,
                token: this.state.token,
                eventos: this.state.eventos,
                page: "usuario",
            })
        }else if(data === "crear_evento"){
            this.setState({
                user: this.state.user,
                token: this.state.token,
                eventos: this.state.eventos,
                page: "crear_evento",
            })
        }else if(data === "crear_evento2"){
            this.setState({
                user: this.state.user,
                token: this.state.token,
                eventos: this.state.eventos,
                page: "crear_evento2",
                new_evento: { id_deporte:parametros}
            })
        }else if(data === "crear_evento3"){
            var new_evento = this.state.new_evento;
            new_evento.nombre_evento = parametros.nombre_evento;
            new_evento.fecha_inicio = parametros.descripcion;
            new_evento.numero_jugadores = parametros.numero_jugadores;

            this.setState({
                user: this.state.user,
                token: this.state.token,
                eventos: this.state.eventos,
                page: "crear_evento3",
                new_evento: new_evento
            })
        }else if(data === "crear_evento4"){
            this.setState({
                user: this.state.user,
                token: this.state.token,
                eventos: this.state.eventos,
                page: "crear_evento4"
            })
        }
    }

    componentDidMount() {

        var url = "http://127.0.0.1:5000/api/eventos/getEventos";
        axios.get(url).then (res => {

            this.setState({
                user: this.state.user,
                token: this.state.token,
                eventos: res.data,
                page: "home"
            })
        });

    }
    
    render() {
        switch (this.state.page) {
            case "home":
                return ( <HomePrueba data={this.callbackFunction} nombre={this.props.user.nombre} token={this.props.token}/> );
            case "usuario":
                return ( <User data={this.callbackFunction} user={this.props.user}/> );
            case "crear_evento":
                return ( <CrearEvento data={this.callbackFunction}/> );
            case "crear_evento2":
                return ( <CrearEvento2 data={this.callbackFunction}/> );
            case "crear_evento3":
                return ( <CrearEvento3 data={this.callbackFunction}/> );
            case "crear_evento4":
                return ( <CrearEvento4 data={this.callbackFunction}/> );
            default:
                return ( <HomePrueba data={this.callbackFunction}/> );
        }   
    }
}
export default Home;