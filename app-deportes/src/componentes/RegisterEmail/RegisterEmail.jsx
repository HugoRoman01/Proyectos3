import React from "react";
import '../../estilos/intro_email.css'


class RegisterEmail extends React.Component {

   
  sendDataEmail = () => {

    var mail = document.getElementById("input_mail_email").value;

    if (mail === "") {
      alert("Introduce un correo electrónico");
      return
    }else if (!mail.includes("@live.u-tad.com") && (!mail.includes("@u-tad.com"))) {
      alert("Introduce un correo electrónico de la U-Tad");
      return
    }
    this.props.AppData("register_password", mail);
  }

  
  render() {

  return (
    <div>
      <div className="titulo_email">
        <h1 >Estás a punto de formar parte de una gran<br />comunidad.</h1>
      </div>

      <div>
        <p className="subtitulo_email">Introduce el correo electrónico de U-Tad</p>
      </div>

      <div>
        <input type="mail" className="input_mail_email" id="input_mail_email" placeholder="Correo electrónico"/>
      </div>

      <div>
      <h1 className="flecha_email" onClick={this.sendDataEmail}>➞</h1>
      </div>
    </div>
  );
}
}

export default RegisterEmail;
