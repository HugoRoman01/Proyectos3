import React from 'react';
import Bienvenida from "./componentes/Bienvenida/Bienvenida"
import Login from './componentes/Login/Login';
import Cuenta_verificada from './componentes/Cuenta_verificada/Cuenta_verificada';
import Intro_email from './componentes/Intro_mail/Intro_email';
import Intro_contrasenia from './componentes/Intro_passwd/Intro_contrasenia';
import Link_verficacion from './componentes/Link/Link_verificacion';

class App extends React.Component {

  state = { page : 'home' }

  callbackFunction = (data) => {
    this.setState({ page : data });
  }

  render() {
    switch (this.state.page) {
      case 'home':
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