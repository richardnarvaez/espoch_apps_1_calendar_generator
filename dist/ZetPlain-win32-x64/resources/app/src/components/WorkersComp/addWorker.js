import React from 'react'
import  { withFirebase } from '../Firebase';

class Add extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data: ""
        }            
    }

    submit(e, firebase){
        //e.preventDefault()
        var firstName = document.getElementById("firstName").value;
        var lastName = document.getElementById("lastName").value;
        var cedula = document.getElementById("cedula").value;
        var celular = document.getElementById("cellphone").value;
        var email = document.getElementById("email").value;
        var licencia = document.getElementById("licencia").value;
        var dateofEx = document.getElementById("dateofEx").value;

        var urlEmpleado = document.getElementById("urlEmpleado").value;

        var score = 5;

        var estadoDelivery = "Sin retraso";

        let dataEmpleado = {firstName, lastName, cedula, celular, email, licencia, dateofEx, estadoDelivery, score,
            urlEmpleado
        }
        
        //firebase.set("/worker", dataempleado)

        firebase.setWorker("/worker", dataEmpleado)

        console.log(">>>Se envio con exito<<<", dataEmpleado)
        alert('Se agrego con exito el empleado');
        
    }

    render(){
        return(<>
            <form className="container">
                <h2 className="spaceUp" style={{color:'#3941ca'}}>Datos del Empleado:</h2>

                <div className="input-group spaceUp">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Nombres y Apellidos</span>
                    </div>
                    <input id="firstName" type="text" className="form-control"
                    placeholder="Alan Armando" pattern="([a-z A-Z ñáéíóú]{2,20})"/>

                    <input id="lastName" type="text" className="form-control" 
                    placeholder="Brito Paredes" pattern="([a-z A-Z ñáéíóú]{2,20})"/>
                </div>

                <div className="input-group spaceUp">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Cedula</span>
                    </div>
                
                    <input id="cedula" type="text" className="form-control" 
                    placeholder="0999999999" pattern="([0-9]{10})"/>
                </div>

                <div className="input-group spaceUp">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Número de Telefono</span>
                    </div>

                    <input id="cellphone" type="text" className="form-control" 
                    placeholder="099999999999" pattern="([0][0-9]{9})"/>
                </div>

                <div className="input-group spaceUp">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Correo:</span>
                    </div>

                    <input id="email" type="text" className="form-control" 
                    placeholder="example_something@gmail.com"/>

                </div>

                <div className="input-group spaceUp">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Imagen de perfil url:</span>
                    </div>
                
                    <input id="urlEmpleado" type="url" className="form-control" 
                    placeholder="https://example.com/example_image.jpg" />
                </div>

                <h2 className="spaceUp" style={{color:'#3941ca'}}>Datos de licencia:</h2>
                
                <div className="container">
                    <div className="input-group mb-3 spaceUp">
                        <div className="input-group-prepend">
                            <label className="input-group-text" for="licencia">Tipo de Licencia</label>
                        </div>
                        
                        <input id="licencia" type="text" className="form-control"
                        placeholder="C" pattern="(C|C1|D|D1|E|E1|A|A1|F|G|B)"/>
                    </div>

                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Fecha de expiración</span>
                        </div>

                        <input id="dateofEx" type="text" className="form-control"
                        placeholder="dd-mm-aaaa" 
                        pattern="(?:3[01]|[12][0-9]|0?[1-9])([\-/.])(0?[1-9]|1[1-2])\1\d{4}"/>
                    </div>
                </div>

                <div className="spaceUp" style={{marginBottom: 16}}>
                    <button id="submit_button" type="submit" className="btn btn-primary btn-lg btn-block"
                    onClick={(e)=>{this.submit(e,this.props.firebase)}}>
                        Añadir
                    </button>
                </div>
            </form>
        </>)
    }
}

export default withFirebase(Add)