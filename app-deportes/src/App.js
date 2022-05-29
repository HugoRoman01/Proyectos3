import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie'

import Bienvenida from "./componentes/Bienvenida/Bienvenida"
import Login from './componentes/Login/Login';
import RegisterEmail from './componentes/RegisterEmail/RegisterEmail';
import RegisterPassword from './componentes/RegisterPassword/RegisterPassword';
import RegisterLinkVerificacion from './componentes/RegisterLinkVerificacion/RegisterLinkVerificacion';
import Home from './componentes/Home/Home';
import HomePrueba from './componentes/Home/HomePrueba/HomePrueba';
import CrearEvento from './componentes/CrearEvento/crearEvento';


class App extends React.Component {

  constructor(props) {
    super(props);

    const cookie = new Cookies();

    this.state = {page:'bienvenida', cookie:cookie.get('access_token')};

    this.cookieLogin = this.cookieLogin.bind(this);
  
  } 

  cookieLogin(){
    if (this.state.cookie) {
      this.llamarAPI('getUserCookie', {}, this.state.cookie);
    }
  }

  llamarAPI(accion, parametros, token){
    var url = "http://127.0.0.1:5000/api/"

    switch(accion){
      case 'getUserCookie':
        url += "login/getUser?jwt=" + token;
        break;
      case 'getUserLogin':
        url += "login/iniciarSesion?email=" + parametros.email + "&password=" + parametros.password;
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
      
      // Para los que necesitan hacer algo con el resultado llamo a sus funciones
      if(res.data.status === 'OK'){
        if(accion === 'getUserCookie'){
          this.inicioSesion(res.data, false);
        }else if(accion === 'getUserLogin'){
          this.inicioSesion(res.data, true);
        }
        
      }
      return res.data
    })

  }

  inicioSesion(data, cookie){
    
    var usuario = {
      'id':data.id,
      'email':data.email,
      'nombre':data.nombre_completo,
      'matriculacion':data.matriculacion,
      'insignias':data.insignias,
      'participaciones':data.participaciones
    }

    const cookies = new Cookies();

    if (cookie) {
      cookies.set('access_token', data.access_token, { path: '/' }); 
    }

    this.setState({
      page:'home',
      usuario : usuario,
      token: cookies.get('access_token')
    })

    

  }

  callbackFunction = (data, parametros=null) => {

    this.setState({ page : data });

    switch(data){
      case 'cookieLogin':
        this.llamarAPI('getUserCookie', {}, this.state.cookie);
        break;
      case 'register_password':
        this.setState({ email: parametros });
        break;

      case  'link_verificacion':
        let password = parametros;
        
        let nombre = this.state.email.split('@')[0].split('.');
        let nombre_completo = nombre[0] + " " + nombre[1];

        let matriculacion = "";

        this.llamarAPI('registro', {'nombre_completo':nombre_completo, 'email':this.state.email, 'password':password, 'matriculacion':matriculacion});

        break;

      case 'enviar_login':

        this.llamarAPI('getUserLogin', {'email':parametros.email, 'password':parametros.password});

        break;

      default:
        console.log("Error")

    }

  }

  render() {

    switch (this.state.page) {
      case 'bienvenida':
        return ( <Bienvenida AppData={this.callbackFunction} onLoad={this.cookieLogin}/> );

      case 'login':
        return ( <Login AppData={this.callbackFunction}/> );

      case 'register_email':
        return ( <RegisterEmail AppData={this.callbackFunction}/> );

      case 'register_password':
        return ( <RegisterPassword AppData={this.callbackFunction}/> );

      case 'link_verificacion':
        return ( <RegisterLinkVerificacion AppData={this.callbackFunction} email={this.state.email}/> );
      case 'home':
        return ( <Home user={this.state.usuario} token={this.state.token}/> );
      case 'homeprueba':
        return ( <HomePrueba/>);
      case 'crearEvento':
        return ( <CrearEvento /> );
      default:
        return ( <h1>Cargando</h1> );

    }
  }
}

export default App;