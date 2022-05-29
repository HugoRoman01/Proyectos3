import React from "react";
import '../../estilos/intro_email.css'


class RegisterEmail extends React.Component {

   
  sendDataEmail = () => {

    var mail = document.getElementById("input_mail_email").value;
    var matriculacion = document.getElementsByClassName("input_matriculacion_email")[0].value


    if (mail === "") {
      alert("Introduce un correo electrónico");
      return
    }else if (!mail.includes("@live.u-tad.com") && (!mail.includes("@u-tad.com"))) {
      alert("Introduce un correo electrónico de la U-Tad");
      return
    }

    if (matriculacion === "") {
      alert("Introduce una matriculación");
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
        <p className="subtitulo_email">Introduce el correo electrónico de U-Tad y el grado que estas cursando</p>
      </div>

      <div>
        <input type="mail" className="input_mail_email" id="input_mail_email" placeholder="Correo electrónico"/>
        <select className="input_matriculacion_email">
                <option value="1">INSO</option>
                <option value="2">DIDI</option>
                <option value="3">ANIMACION</option>
            </select>
      </div>

      <div>
      <h1 className="flecha_email" onClick={this.sendDataEmail}>➞</h1>
      </div>
    </div>
  );
}
}

export default RegisterEmail;
