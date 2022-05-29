import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie'

import Bienvenida from "./componentes/Bienvenida/Bienvenida"
import Login from './componentes/Login/Login';
import Cuenta_verificada from './componentes/Cuenta_verificada/Cuenta_verificada';
import Intro_email from './componentes/Intro_mail/Intro_email';
import Intro_contrasenia from './componentes/Intro_passwd/Intro_contrasenia';
import Link_verficacion from './componentes/Link/Link_verificacion';
import { toHaveDisplayValue } from '@testing-library/jest-dom/dist/matchers';



class App extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      page:'bienvenida',
      id:0,
      email:"",
      nombre:"",
      matriculacion:"",
      insignias:[],
      participaciones:0,
      eventos:[{}]};

    const cookie = new Cookies();

    if(cookie.get('access_token')){
      
      var url = "http://127.0.0.1:5000/api/login/getUser/?access_token=" + cookie.get('access_token');

      const axiosInstance = axios.create({
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      });

      axiosInstance.get(url)
        .then(res => {

          if(res.data.status === 'OK'){
            var usuario = {
              'id':res.data.id,
              'email':res.data.email,
              'nombre':res.data.nombre_completo,
              'matriculacion':res.data.matriculacion,
              'insignias':res.data.insignias,
              'participaciones':res.data.participaciones
            }

            this.setState({
              page: 'home',
              usuario: usuario,
              eventos: [{}]
            });
            
          }
        })
    }

  } 

  llamarAPI(accion, parametros, token){
    var url = "http://127.0.0.1:5000/api/"

    switch(accion){
      case 'getUserCookie':
        url += "login/getUser?jwt=" + token;
        break;
      case 'getUserLogin':
        url += "login/getUser?email=" + parametros.email + "&password=" + parametros.password;
        break;
      case 'registro':
        url += "registro/crearCuenta?nombre_completo=" + parametros.nombre_completo + "&email=" + parametros.email + "&password=" + parametros.password + "&matriculacion=" + parametros.matriculacion;
        break;
      case 'getEventos':
        url += "eventos/getEventos";
        break;
      case 'inscribir':
        url += "eventos/inscribir?jwt=" + token + "&id_evento=" + parametros.evento;
        break;
      case 'crearEvento':
        url += "eventos/crearEvento?jwt=" + token + "id_deporte=" + parametros.deporte + "&max_participantes=" + parametros.max_participantes + "&nombre_evento=" + parametros.nombre_evento + "&descripcion_evento=" + parametros.descripcion_evento + "&fecha_inicio=" + parametros.fecha_inicio + "&fecha_fin=" + parametros.fecha_fin + "&hora_inicio=" + parametros.hora_inicio + "&hora_fin=" + parametros.hora_fin;
        break;
      default:
        return null;
    }

    console.log(url);

    axios.get(url).then(res => {
      console.log(res.data)
      return res.data
    })

  }

  callbackFunction = (data, parametros=null) => {

    this.setState({ page : data });
    
    switch(data){
      case 'register_password':
        this.setState({ email: parametros });
        console.log("Email puesto! -> " + this.state.email)

        break;
      case  'link_verificacion':
        let password = parametros;
        
        let nombre = this.state.email.split('@')[0].split('.');
        let nombre_completo = nombre[0] + " " + nombre[1];

        let matriculacion = "";

        let query = this.llamarAPI('registro', {'nombre_completo':nombre_completo, 'email':this.state.email, 'password':password, 'matriculacion':matriculacion});

        console.log(query);

        break;

        //crearCuenta(this.state.user.email, password);

    }

  }

  render() {

    switch (this.state.page) {
      case 'bienvenida':
        return ( <Bienvenida AppData={this.callbackFunction}/> );

      case 'login':
        return ( <Login AppData={this.callbackFunction}/> );

      case 'verificada':
        return ( <Cuenta_verificada AppData={this.callbackFunction}/> );

      case 'register_email':
        return ( <Intro_email AppData={this.callbackFunction}/> );

      case 'register_password':
        return ( <Intro_contrasenia AppData={this.callbackFunction}/> );

      case 'link_verificacion':
        return ( <Link_verficacion AppData={this.callbackFunction} email={this.state.email}/> );

      default:
        return ( <h1>Error</h1> );

    }
  }
}

export default App;