import React from "react";
import '../../estilos/intro_contrasenia.css'
 
function Intro_contrasenia() {


  return (
    <div>

     <div class="titulo">
        <h1 >Introduce una contraseña segura.</h1>
      </div>

      <div>
        <p class="subtitulo">Esta debe contener entre 8-10 dígitos (M,m, -, 6, #....)</p>
      </div>

      <div>
        <input type="mail" id="input1" class="input-contra" placeholder="Contraseña"/>
      </div>

      <div>
        <input type="mail" id="input2" class="input-contra" placeholder="Contraseña"/>
      </div>

      <h1 class="flecha">→</h1>

    </div>
  );
}

export default Intro_contrasenia;
