import React from "react";
import '../../estilos/intro_descripcion.css'

class RegisterDescripcion extends React.Component {

    sendDataDescripcion = () => {
        var descripcion = document.getElementById("input_descripcion_descripcion").value;
        if (descripcion === "") {
            alert("Introduce una descripción");
            return
        }

        this.props.AppData("register_email", descripcion);
    }

    render() {
        return (
            <div>
                <div className="titulo_descripcion"> <h1>Cuentanos algo acerca de ti! </h1> </div>
                <div className="subtitulo_descripcion"> Danos una pequeña descripcion tuya para conocerte mejor</div>
                <div className="input_descrpcion_descripcion">
                    <textarea type="text" className="input_descripcion_descripcion" id="input_descripcion_descripcion" placeholder="Describe tu perfil" />
                </div>
                <div>
                <h1 className="flecha_descripcion" onClick={this.sendDataDescripcion}>➞</h1>
                </div>
            </div>
            
        )
    }
}
export default RegisterDescripcion;