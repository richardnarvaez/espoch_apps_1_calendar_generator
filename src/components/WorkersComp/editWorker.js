import React from 'react'
import Star from "../FlotaComp/progressStar"
import Icon from '../../lib/svg'
import  { withFirebase } from '../Firebase';

class EditWorker extends React.Component{
    constructor(props){
        super(props)
        this.state={
            showurlEmpleado: false,
            showurlCar: false,
        }        
    }

    edit(firebase, clave){
        //e.preventDefault()
        var firstName = document.getElementById("firstName").value;
        var lastName = document.getElementById("lastName").value;
        var cedula = document.getElementById("cedula").value;
        var celular = document.getElementById("cellphone").value;
        var email = document.getElementById("email").value;
        var licencia = document.getElementById("licencia").value;
        var dateOfEx = document.getElementById("dateofEx").value;
        //var idFlota = document.getElementById("idFlota").value;
        var urlEmpleado = document.getElementById("urlEmpleado").value;

        let object = {firstName, lastName, cedula, celular, email, licencia, dateOfEx,
            urlEmpleado 
        }
        
        console.log(">>>Se modifico con exito<<<", object)

        firebase.modify("/worker/"+clave, object)
        
        this.props.success();
    }

    render(){
        const {loading, data, id} = this.props
        return(<>   
            <div className="container">
                {/* Header */}
                <div className="d-flex row align-items-center justify-content-between border-bottom ">
                    <div>
                        <h1 id="titleinfoFlota">Datos del Empleado</h1>
                    </div>
                    <div>
                        <div onClick={()=> {alert("Ya se encuentra en esta pestaña")}}>
                            <Icon name="account-edit" fill="#78cf00"/>
                        </div>
                        <div onClick={()=> {alert("Se encuentra en la pestaña de editar datos")}}>
                            <Icon name="account-delete" fill="#e0dede"/> 
                        </div>
                    </div>
                </div>
                {/* Header */}
            </div>
            <form className="container">  
                <div className="spaceUp row align-items-center justify-content-between">
                    <div className="col-2">
                        <img className={"imgflota"}
                            src= {loading ? data[id].urlEmpleado : null}>
                        </img>

                        <div id="clicUrl" className="d-flex justify-content-center align-items-center iconImageEdit"
                        onClick={()=> {this.setState({showurlEmpleado: true})}}>
                            <Icon name="pencil" fill="#fffff"/>
                        </div>
                    </div>

                    <div className="input-group col-9" hidden={this.state.showurlEmpleado ? false : true}>
                        <div className="input-group-prepend">
                            <span className="input-group-text">url:</span>
                        </div>
                    
                        <input id="urlEmpleado" type="url" className="form-control" 
                        placeholder="https://example.com/example_image.jpg"
                        defaultValue={loading ? data[id].urlEmpleado : "loading..."}/>
                    </div>
                </div>        

                <div className={"spaceUp"}>
                    <div className="row justify-content-between">
                        <p>Nombres y Apellidos:</p>

                        <div className="input-group">
                            <input id="firstName" type="text" className="form-control"
                            placeholder="Alan Armando" pattern="([a-z A-Z ñáéíóú]{2,20})"
                            defaultValue={loading ? data[id].firstName : "loading..."}/>

                            <input id="lastName" type="text" className="form-control" 
                            placeholder="Brito Paredes" pattern="([a-z A-Z ñáéíóú]{2,20})"
                            defaultValue={loading ? data[id].lastName : "loading..."}/>
                        </div>

                    </div>

                    <div className="row justify-content-between">
                        <p>Flota de trabajo:</p>
                        <p>{loading ? data[id].idFlota : "loading..."}</p>
                    </div>

                    <div className="row justify-content-between">
                        <p>Cedula de Indentidad:</p>
                        
                        <input id="cedula" type="text" className="form-control" 
                        placeholder="0999999999" pattern="([0-9]{10})"
                        defaultValue={loading ? data[id].cedula : "loading..."}/>
                    </div>

                    <div>
                        <p>Datos de licencia:</p>
                        <div className="container">
                            <div className="row justify-content-between">
                                <p>Categoria:</p>

                                <input id="licencia" type="text" className="form-control"
                                placeholder="C" 
                                defaultValue={loading ? data[id].licencia : "loading..."}
                                pattern="(C|C1|D|D1|E|E1|A|A1|F|G|B)"/>
                            </div>

                            <div className="row justify-content-between">
                                <p>Fecha de expiracion:</p>
                                
                                <input id="dateofEx" type="text" className="form-control"
                                placeholder="dd-mm-aaaa" 
                                defaultValue={loading ? data[id].dateOfEx : "loading..."}
                                pattern="([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})"/>
                            </div>
                        </div>
                    </div>

                    <div className="row justify-content-between">
                        <p>Valoracion:</p>
                        {loading ?
                            <Star num={data[id].score} />
                            :
                            "loading..."
                        }
                        
                    </div>

                    <div className="row justify-content-between">
                        <p>Estado:</p>
                        <p>{loading ? data[id].estadoDelivery : "loading..."}</p>
                    </div>

                    <div className="row justify-content-between">
                        <p>Número de Celular:</p>
                        <input id="cellphone" type="text" className="form-control" 
                        placeholder="0999999999" pattern="([0][0-9]{9})"
                        defaultValue={loading ? data[id].celular : "loading..."}/>
                    </div>

                    <div className="row justify-content-between">
                        <p>Correo:</p>
                        <div className="input-group">
                            <input id="email" type="email" className="form-control" 
                            placeholder="example_something@gmail.com"
                            defaultValue={loading ? data[id].email : "loading..."}/>
                        </div>
                    </div>
                    
                </div>

                <div className="spaceUp">
                    <div className="row justify-content-around spaceUp" style={{marginBottom: 16}}>
                        <div>
                            <button type="submit" className="btn btn-outline-primary"
                            onClick={() => {this.edit(this.props.firebase, data[id].id)}}>
                                Actualizar
                            </button>
                        </div>
                        <div>
                            <button type="submit" className="btn btn-outline-primary"
                            onClick={(e)=> {this.props.back(e)}}>
                                Cancelar
                            </button>
                        </div>
                    </div>

                </div>
            </form>
        </>)
    }
}

export default withFirebase(EditWorker);