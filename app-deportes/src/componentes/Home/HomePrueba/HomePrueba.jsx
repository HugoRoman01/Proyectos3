import React from "react";
import '../../../estilos/homeprueba.css';


class HomePrueba extends React.Component {
    


    render() {
/*
        function pulsado(boton) {
            boton.style.background == "url(../imagenes/cambiar.png)";
        }

        function noPulsado(boton) {
            boton.style.background == "url(../imagenes/cambiado.png)";
        } */
        var evento1 = {
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

        switch (evento1.id_deporte) {
            case 1:
                evento1.id_deporte = "Padel";
                break;
            case 2:
                evento1.id_deporte = "Futbol";
                break;
            case 3:
                evento1.id_deporte = "Basket";
                break;
            default:
                break;
        }


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

        let eventos = [];
        for (let step = 0; step < 3 ; step++) {
            eventos.push(
            <div className="eventotarjeta">
                <div className="fecha"> {evento1.fecha_inicio} <button className="botonhomeprueba" >Unirse</button></div>
                <div className="nombre"> {evento1.nombre_evento}:  {evento1.max_participantes} participantes  </div>
                <div className="hora">{evento1.hora_inicio}</div>
            </div>
            );
        }

        
        return (
            <div>
                <div className="menuhamburguesa">
                    <nav >
                        <input type="checkbox" id="menu" />
                        <label for="menu" className="icono_homeprueba"> ☰ </label>
                        <ul>
                            <li onClick={this.sendDataHome}>☎ Home</li>
                            <li onClick={this.sendDataUser}>♕ Mi Perfil</li>
                            <li onClick={this.sendDataCrear}>✚ Crear Evento</li>
                            <li className="last_homeprueba" onClick={this.sendDataMisEventos}>☑ Mis Eventos</li>
                        </ul>
                    </nav>
                </div>
                <div className="name"> ¡Hola, {user.nombre} !</div>
                <div className="texto"> Estos eventos podrian interesarte: </div>
                {eventos}

            </div>
                
        );
    }
}

export default HomePrueba;