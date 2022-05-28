import React from "react";
import '../../estilos/link_verificacion.css'
 
function Link_verificacion() {

  return (
    <div>

      <div class="titulo">
        <h1 >Has recibido un link de verificación a </h1>
      </div>

      <div>
        <p class="subtitulo">textodeprueba@live.u-tad.com</p>
      </div>

      <div class="conjunto">
        <p class="llegado">¿No te ha llegado ningún correo?</p>
        <p class="Reenviar">Reenviar.</p>
      </div>

    </div>
  );
}

export default Link_verificacion;