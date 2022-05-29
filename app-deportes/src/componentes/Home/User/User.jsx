import React from "react";
import  '../../../estilos/user.css';
import velocista_0 from "../../../imagenes/velocista_0.png";
import velocista_1 from "../../../imagenes/velocista_0.png";
import inbatible_0 from "../../../imagenes/velocista_0.png";
import inbatible_1 from "../../../imagenes/velocista_0.png";
import estratega_0 from "../../../imagenes/velocista_0.png";
import estratega_1 from "../../../imagenes/velocista_0.png";

class User extends React.Component {
    
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


    render() {
        var user = {
            id_usuario: 1,
            nombre: "Juan",
            matriculacion: "INSO",
            descripcion: "Soy un estudiante de la U-tad, y estoy aprendiendo a programar en React",
            eventos_creados: 3,
            eventos_asistidos: 8,
            insignias: [0,1,0],
            mail: "prueba@gmail.com"

        };

        var insignias = []

        if(user.insignias[0] == 1){
            insignias[0] = velocista_0;
        }else{
            insignias[0] = velocista_1;
        }

        if(user.insignias[1] == 1){
            insignias[1] = inbatible_1;
        }else{
            insignias[1] = inbatible_0;
        }

        if(user.insignias[2] == 1){
            insignias[2] = estratega_1;
        }else{
            insignias[2] = estratega_0;
        }

    
        return (
            
            <div>
                <div className="menuhamburguesa">
                <nav >
                    <input type="checkbox" id="menu" className="check_user"/>
                    <label for="menu" className="icono_user"> ☰ </label>
                    <ul>
                        <li onClick={this.sendDataHome}>☎ Home</li>
                        <li onClick={this.sendDataUser}>♕ Mi Perfil</li>
                        <li onClick={this.sendDataCrear}>✚ Crear Evento</li>
                        <li className="last_user" onClick={this.sendDataMisEventos}>☑ Mis Eventos</li>
                    </ul>
                </nav>
            </div>
            <div className="userBanner">
                <div className="userImg"> </div>
                <div className="userNombre"> {this.props.user.nombre} </div>
                <div className="userMatriculacion"> {this.props.user.matriculacion} </div>
            </div>
            <div className="userDescripcion">
                <p className="title">ABOUT ME: </p>
                <br />
                {user.descripcion} 
            </div>
            <div className="userEventosCreados">
                <p className="title2">EVENTOS CREADOS:    {user.eventos_creados}</p>
            </div>
            <div className="userEventosAsistidos">
                <p className="title2">EVENTOS ASISTIDOS: {this.props.user.participaciones}</p>
            </div>
            <div className="userBox"></div>
            <div className="userInsignias"> 
               <p className="title5"> Insignias:</p>
               <div>
                    <img className="insignia" src={insignias[0]} alt="velocista"/>
                    <p>Velocista</p>
               </div>
               <div>
                    <img className="insignia" src={insignias[1]} alt="inbatible"/>
                    <p>Velocista</p>
               </div>
               <div>
                    <img className="insignia" src={insignias[2]} alt="estratega"/>
                    <p>Velocista</p>
               </div>
               
            </div>
            <div className="usercontacto"> 
                <p className="title3"> CONTACTO: {this.props.user.email} </p>
                <p className="title3">Estudiante de: {this.props.user.matriculacion} </p>
            </div>

            </div>
        );
        
    }
}

export default User;