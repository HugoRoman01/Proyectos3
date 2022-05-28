import React from "react";
import '../../estilos/intro_contrasenia.css'
 
function Intro_contrasenia() {


  return (
    <div>

     <div class="titulo_password">
        <h1 >Introduce una contraseña segura.</h1>
      </div>

      <div>
        <p class="subtitulo_password">Esta debe contener entre 8-10 dígitos (M,m, -, 6, #....)</p>
      </div>

      <div>
        <input type="mail" id="input1_password" class="input-contra_password" placeholder="Contraseña"/>
      </div>

      <div>
        <input type="mail" id="input2_password" class="input-contra_password" placeholder="Contraseña"/>
      </div>

      <h1 class="flecha_password">→</h1>

    </div>
  );
}

export default Intro_contrasenia;
