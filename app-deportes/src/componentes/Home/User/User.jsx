import React from "react";
import  '../../../estilos/user.css';


class User extends React.Component {
    
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
                <div className="userNombre"> {user.nombre} </div>
                <div className="userMatriculacion"> {user.matriculacion} </div>
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
                <p className="title2">EVENTOS ASISTIDOS: {user.eventos_asistidos}</p>
            </div>
            <div className="userBox"></div>
            <div className="userInsignias"> 
               <p className="title5"> Insignias: {user.insignias} </p>
            </div>
            <div className="usercontacto"> 
                <p className="title3"> CONTACTO: {user.mail} </p>
                <p className="title3">Estudiante de: {user.matriculacion} </p>
            </div>

            </div>
        );
        
    }
}

export default User;