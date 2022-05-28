import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie'

import Bienvenida from "./componentes/Bienvenida/Bienvenida"
import Login from './componentes/Login/Login';
import Cuenta_verificada from './componentes/Cuenta_verificada/Cuenta_verificada';
import Intro_email from './componentes/Intro_mail/Intro_email';
import Intro_contrasenia from './componentes/Intro_passwd/Intro_contrasenia';
import Link_verficacion from './componentes/Link/Link_verificacion';

function getUserCookie(app){
  app.setState({page:'login'});
}

class App extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {page:'bienvenida', user:{}, eventos:[{}]};

    this.getEventos = this.getEventos.bind(this);
    this.getUsuario = this.getUsuario.bind(this);
    
    const cookie = new Cookies();

    if(cookie.get('access_token')){
      
      var url = "http://127.0.0.1:5000/api/login/getUser/?access_token=" + cookie.get('access_token');

      axios.get(url)
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
              eventos: this.getEventos()
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
        url += "registro?nombre_completo=" + parametros.nombre_completo + "&email=" + parametros.email + "&password=" + parametros.password + "&matriculacion=" + parametros.matriculacion;
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
      return res
    })

  }

  getUsuario(email, password){
    console.log(this.llamarAPI('getEventos', null, null));
  }

  getEventos(){
    return [{nombre:'Evento 1'},{nombre:'Evento 2'}];
  }

  callbackFunction = (data) => {
    this.setState({ page : data });
    
    if (data === 'enviar_login'){
      this.getUsuario('email', 'password');
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
        return ( <Link_verficacion AppData={this.callbackFunction}/> );

      default:
        return ( <h1>Error</h1> );

    }
  }
}

export default App;