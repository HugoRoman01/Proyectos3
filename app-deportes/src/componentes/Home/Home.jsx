import axios from "axios";
import React from "react";
import "../../estilos/home.css";
import HomePrueba from "./HomePrueba/HomePrueba";
import User from "./User/User";
import CrearEvento from "../CrearEvento/crearEvento";
import CrearEvento2 from "../CrearEvento2/CrearEvento2";
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
        switch (this.state.page) {
            case "home":
                return ( <HomePrueba/> );
            case "usuario":
                return ( <User/> );
            case "crear_evento":
                return ( <CrearEvento/> );
            case "crear_evento2":
                return ( <CrearEvento2/> );
            case "crear_evento4":
                return ( <CrearEvento4/> );
            default:
                return ( <HomePrueba/> );
    }   
}
}
export default Home;