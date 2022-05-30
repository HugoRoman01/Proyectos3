import axios from "axios";
import React from "react";
import "../../estilos/home.css";
import HomePrueba from "./HomePrueba/HomePrueba";
import User from "./User/User";
import CrearEvento from "../CrearEvento/CrearEvento";
import CrearEvento2 from "../CrearEvento2/CrearEvento2";
import CrearEvento3 from "../CrearEvento3/CrearEvento3";
import CrearEvento4 from "../CrearEvento4/CrearEvento4";
import EventoInfo from "./EventoInfo/EventoInfo";


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
            new_evento.descripcion = parametros.descripcion;
            new_evento.numero_jugadores = parametros.numero_jugadores;

            this.setState({
                user: this.state.user,
                token: this.state.token,
                eventos: this.state.eventos,
                page: "crear_evento3",
                evento: new_evento
            })          

        }else if(data === "crear_evento4"){
            var new_evento = this.state.new_evento;
            new_evento.fecha_inico = parametros.fecha_inicio;
            new_evento.fecha_fin = parametros.fecha_fin;
            new_evento.hora_inicio = parametros.hora_inicio;
            new_evento.hora_fin = parametros.hora_fin;


            var url = "http://127.0.0.1:5000/api/eventos/crearEvento?jwt="+this.props.token + "&nombre_evento="+this.state.new_evento.nombre_evento+"&descripcion="+this.state.new_evento.descripcion+"&max_participantes="+this.state.new_evento.numero_jugadores+"&id_deporte="+this.state.new_evento.id_deporte+"&fecha_inicio="+this.state.new_evento.fecha_inico+"&fecha_fin="+this.state.new_evento.fecha_fin+"&hora_inicio="+this.state.new_evento.hora_inicio+"&hora_fin="+this.state.new_evento.hora_fin;

            axios.get(url).then (res => {
    
                if(res.data.status === "OK"){
                    this.setState({
                        user: this.state.user,
                        token: this.state.token,
                        eventos: this.state.eventos.push(this.state.new_evento),
                        page: "crear_evento4"
                    })
                }else{
                    this.setState({
                        user: this.state.user,
                        token: this.state.token,
                        eventos: this.state.eventos,
                        page: "home"
                    })
                }
    
            }); 


        }else if(data === "ver_evento"){
            this.setState({
                user: this.state.user,
                token: this.state.token,
                eventos: this.state.eventos,
                page: "evento_info",
                evento: this.state.eventos[parametros]
            })
        }else if(data === "inscribirse"){

            var url = "http://127.0.0.1:5000/api/eventos/inscribir?jwt="+this.props.token + "&id_evento="+parametros;

            axios.get(url)

            alert("Te has inscrito al evento");
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
                return ( <HomePrueba data={this.callbackFunction} eventos={this.state.eventos} nombre={this.props.user.nombre} token={this.props.token}/> );
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
            case "evento_info":
                return (<EventoInfo data={this.callbackFunction} evento={this.state.evento}/>)
            default:
                return ( <HomePrueba data={this.callbackFunction}/> );
        }   
    }
}
export default Home;