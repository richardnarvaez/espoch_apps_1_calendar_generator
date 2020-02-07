import React from 'react'
import Icon from '../../lib/svg'
import  { withFirebase } from '../Firebase';

class EditFlota extends React.Component{
    constructor(props){
        super(props)
        this.state={
            showurlCar: false,
        }        
    }

    progress(start, end){
        var porcent = ((start*100)/end)
        return(porcent+"%")
    }

    edit(firebase, clave){
        //e.preventDefault()
        var nf = document.getElementById("nf").value;
        var placa = document.getElementById("placa").value;
        var urlCar = document.getElementById("urlCar").value;
        var maxtanques = document.getElementById("maxtanques").value;

        /*var score = 5;
        var nowOrder = 50;
        var numberofOrders = 80
        var estado = "retrasado con 1";
        var estadoCar = "rodando";
        var lastMaintenance = "05/05/2019";
        var url = "https://www.tuenlinea.com/wp-content/uploads/2018/08/%C2%BFTe-has-preguntado-que-sue%C3%B1a-tu-perrito.jpg"*/

        let object = {nf, placa, urlCar, maxtanques /*score, nowOrder,numberofOrders, estado, estadoCar, lastMaintenance*/}
        
        firebase.modify("/flota/"+clave, object)
        console.log(">>>Se modifico con exito<<<", object)
        this.props.success();
    }

    render(){
        const {loading, data, id} = this.props
        return(<>   
            <div className="container">
                {/* Header */}
                <div className="d-flex row align-items-center justify-content-between border-bottom ">
                    <div>
                        <h1 id="titleinfoFlota">Datos de la Unidad</h1>
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

            <form onSubmit={()=> {this.edit(this.props.firebase, data[id].placa)}} className="container">  
                    
                <div className="spaceUp">

                    <div className="spaceUp row align-items-center justify-content-between">
                        <div className="col-2">
                            <img className="imgflota"
                                src= {loading ? data[id].urlCar : null}>
                            </img>

                            <div id="clicUrl" className="d-flex justify-content-center align-items-center iconImageEdit"
                            onClick={()=> {this.setState({showurlCar: true})}}>
                                <Icon name="pencil" fill="#fffff"/>
                            </div>
                        </div>
                        
                        <div className="input-group col-9" hidden={this.state.showurlCar ? false : true}>
                            <div className="input-group-prepend">
                                <span className="input-group-text">url:</span>
                            </div>
                        
                            <input id="urlCar" type="url" className="form-control" 
                            placeholder="https://example.com/example_image.jpg"
                            defaultValue={loading ? data[id].urlCar : "loading..."}/>
                        </div> 
                            
                    </div>

                    <div className="row justify-content-between">
                        <div>
                            <p>Pedidos entregados:</p>
                        </div>
                        <div className="row">
                            <p>{loading ? data[id].nowOrder : "loading..."}</p>
                            <p>/</p>
                            <p>{loading ? data[id].numberofOrders : "loading..."}</p>
                        </div>
                    </div>

                    <div className="progress">
                        <div className="progress-bar bg-warning progress-bar-striped progress-bar-animated" 
                        role="progressbar"
                        style={{width: this.progress(data[id].nowOrder, data[id].numberofOrders)}} 
                        aria-valuemin="0" aria-valuemax="100">
                            <div className="row justify-content-around">
                                <p>{loading ? data[id].nowOrder : "loading..."}</p>
                                <p>de</p>
                                <p>{loading ? data[id].numberofOrders : "loading..."}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="spaceUp">
                        <div>
                            <div className="row justify-content-between">
                                <p>Número de flota:</p>
                                <input id="nf" type="text" className="form-control" placeholder="01" 
                                pattern="[0-9]{2}"
                                defaultValue={loading ? data[id].nf : "loading..."}/>
                            </div>

                            <div className="row justify-content-between">
                                <p>Placas:</p>
                                <input id="placa" type="text" className="form-control" 
                                placeholder="TCD-0090" pattern="([A-Z]{3}-\d{3,4})"
                                defaultValue={loading ? data[id].placa : "loading..."}/>
                            </div>

                            <div className="row justify-content-between">
                                <p>Estado:</p>
                                <p>{loading ? data[id].estadoCar : "loading..."}</p>
                            </div>

                            <div className="row justify-content-between">
                                <p>Maximo de tanques:</p>
                                <input id="maxtanques" type="text" className="form-control" 
                                placeholder="40" pattern="[0-9]{1,2}"
                                defaultValue={loading ? data[id].maxtanques : "loading..."}/>
                            </div>

                            <div className="row justify-content-between">
                                <p>Ultimo mantenimiento:</p>
                                <p>{loading ? data[id].lastMaintenance : "loading..."}</p>
                            </div>

                        </div>
                    </div>
                    
                    <div className="row justify-content-around spaceUp" style={{marginBottom: 16}}>
                        <div>
                            <input type="submit" className="btn btn-outline-primary"
                            value="Actualizar"/>
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

export default withFirebase(EditFlota);