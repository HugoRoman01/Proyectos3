
import React from 'react';
import reactDom from 'react-dom';
import ReactDom from 'react-dom';
import Bienvenida from "./componentes/Bienvenida/Bienvenida"
import Login from './componentes/Login/Login';
import Cuenta_verificada from './componentes/Cuenta_verificada/Cuenta_verificada';
import Intro_email from './componentes/Intro_mail/Intro_email';
import Intro_contrasenia from './componentes/Intro_passwd/Intro_contrasenia';
import Link_verficacion from './componentes/Link/Link_verificacion';

var key = 'home';


export function onClickk(screen) {
  console.log("Hola  " + screen);
  key = screen;
}


class App extends React.Component {


  render() {
    switch (key) {
      case 'home':
        return ( <Bienvenida /> );
        break;
      case 'login':
        return ( <Login /> );
        break;
      case 'verificada':
        return ( <Cuenta_verificada /> );
        break;
      case 'intro_email':
        return ( <Intro_email /> );
        break;
      case 'intro_contrasenia':
        return ( <Intro_contrasenia /> );
        break;
      case 'link_verificacion':
        return ( <Link_verficacion /> );
        break;
      default:
        return ( <h1>Error</h1> );
        break;

    }
  }
}

export default App;