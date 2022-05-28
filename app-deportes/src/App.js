import React from 'react';
import Cookies from 'universal-cookie';

import Bienvenida from "./componentes/Bienvenida/Bienvenida";
import Login from './componentes/Login/Login';
import Cuenta_verificada from './componentes/Cuenta_verificada/Cuenta_verificada';
import Intro_email from './componentes/Intro_mail/Intro_email';
import Intro_contrasenia from './componentes/Intro_passwd/Intro_contrasenia';
import Link_verficacion from './componentes/Link/Link_verificacion';
import axios from 'axios';


class App extends React.Component {

  state = { page : 'bienvenida' }

  getUserCookie(){

    const cookie = new Cookies();

    if(cookie.get('access_token')){
      //Datos usuario

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
              usuario: usuario
            });
            
          }

        })

        return
    }
  }

  callbackFunction = (data) => {
    this.setState({ page : data });
  }

  render() {

    this.getUserCookie();

    switch (this.state.page) {
      case 'bienvenida':
        return ( <Bienvenida AppData={this.callbackFunction}/> );
      case 'login':
        return ( <Login AppData={this.callbackFunction}/> );

      case 'verificada':
        return ( <Cuenta_verificada AppData={this.callbackFunction}/> );

      case 'intro_email':
        return ( <Intro_email AppData={this.callbackFunction}/> );

      case 'intro_contrasenia':
        return ( <Intro_contrasenia AppData={this.callbackFunction}/> );

      case 'link_verificacion':
        return ( <Link_verficacion AppData={this.callbackFunction}/> );

      default:
        return ( <h1>Error</h1> );

    }
  }
}

export default App;