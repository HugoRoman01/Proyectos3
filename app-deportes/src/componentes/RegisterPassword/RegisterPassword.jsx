import React from "react";
import '../../estilos/intro_contrasenia.css'
 


class RegisterPassword extends React.Component {

  sendDataLink = () => {

    var pass1 = document.getElementById("input1_password").value;
    var pass2 = document.getElementById("input2_password").value;
    
    if (pass1 === "" || pass2 === "") {
      alert("Introduce las dos contraseñas");
      return
    }else if (pass1.length < 8 || pass1.length > 10) {
      alert("Introduce una contraseña de 8-10 dígitos");
      return
    }else if (pass1 !== pass2) {
      alert("Las contraseñas no coinciden");
      return
    }

    this.props.AppData('link_verificacion', pass1);
  }

  render() {
  

  return (
    <div>

     <div class="titulo_password">
        <h1 >Introduce una contraseña segura.</h1>
      </div>

      <div>
        <p class="subtitulo_password">Esta debe contener entre 8-10 dígitos (M,m, -, 6, #....)</p>
      </div>

      <div>
        <input type="password" id="input1_password" class="input-contra_password" placeholder="Contraseña"/>
      </div>

      <div>
        <input type="password" id="input2_password" class="input-contra_password" placeholder="Repite tu contraseña"/>
      </div>

      <h1 class="flecha_password" onClick={this.sendDataLink}>➞</h1>

    </div>
  );
  }
}

export default RegisterPassword;
