import React from 'react'
import Star from './progressStar'
import Icon from '../../lib/svg'
import EditFlota from './editflota'
import  { withFirebase } from '../Firebase';


class DataFlota extends React.Component{
    constructor(props){
        super(props)
        this.state={
            showedit: false,
        }          
    }

    showE(){
        if (window.confirm("¿Desea ingresar a la pestaña de modificar datos?")) {
            this.setState({showedit: true})
            this.props.disarm(true)
        } else {
            alert('Se cancelo la solicitud editar datos');
        }
    }

    back(e){
        if (window.confirm("¿Desea regresar a la pestaña de datos?")) {
            this.setState({showedit: false})
            this.props.disarm(false)
        } else {
            e.preventDefault()
            alert('Se cancelo la solicitud');
        }
    }

    success(){
        alert('Se modificaron los datos del empleado con exito');
        this.setState({showedit: false})
        this.props.disarm(false)
    }

    render(){
        //const id = 0
        const {loading, data, id} = this.props
        return(<>
            <div className="col-4 scroll">
                {this.state.showedit ? 
                    <EditFlota back={this.back.bind(this)}
                    success={this.success.bind(this)}
                    loading={loading} data={data} id={id}/>
                : 
                    <Data remove={this.props.remove.bind()} 
                    callBack={this.showE.bind(this)}
                    loading={loading} data={data} id={id}
                    firebase={this.props.firebase}/> 
                }
            </div>
        </>)
    }
}

class Data extends React.Component{
    constructor(props){
        super(props)
        this.state={
            snap: [],
            id: "nada",
            error: true,
            loading: false,
            notExist: true,
        }       
    }

    async addEmpleado(ctx, firebase, idFlota){
        var cedula = document.getElementById("cedula").value;
        console.log("firebase", firebase)
        console.log("cedula", cedula)
        console.log("CTX", ctx)
        let snapshot;
        if(cedula != ""){
           await firebase.search("/worker", "cedula", cedula,
            snap=>{
                if ( snap.val()!=null && snap.val()!= undefined ){
                    console.log("DATADATA", snap.val())
                    snapshot = Object.values(snap.val())
                    firebase.addWorker("/flota/"+idFlota, snapshot[0].id, idFlota)
                    alert("Se asigno el empleado a la flota")
                } else {
                    ctx.setState({
                        snap: null,
                        error: true,
                        loading: false,
                        notExist: true,
                    })
                    alert("No se encontro al empleado")   

                }},error=>{console.log("Error",error);
            })
            //console.log("CTX2", ctx.state.snap[0].id)
            /*if(ctx.state.snap != null ){
                firebase.addWorker("/flota/"+idFlota, ctx.state.snap[0].id, idFlota)
                alert("Se asigno el empleado a la flota")
            }else{
                alert("No se encontro al empleado")    
            }*/
        }else{
            alert("El campo esta vacio, no se añadio a nadie")
        }
    }

    progress(start, end){
        var porcent = ((start*100)/end)
        console.log("porcent",porcent)
        return(porcent+"%")
    }

    render(){
        const {loading, data, id, firebase} = this.props
        return(<>
            <div className="container">
                {/* Header */}
                <div className="d-flex row align-items-center justify-content-between border-bottom ">
                    <div>
                        <h1 id="titleinfoFlota">Datos de la Unidad</h1>
                    </div>
                    <div>
                        <div id="clicEdit" 
                        onClick={()=> {this.props.callBack()}}>
                            <Icon name="account-edit" fill="#fffff"/>
                        </div>
                        <div id="clicDel"
                        onClick={()=> {this.props.remove(data[id].placa, data[id].workers, firebase)}}>
                            <Icon name="account-delete" fill="#fffff"/> 
                        </div>
                    </div>
                </div>
                {/* Header */}

                <div>

                    <div className={"spaceUp align-items-center"}>
                        <img className="imgflota"
                            src= {loading ? data[id].urlCar : null}>
                        </img>
                    </div>
                    
                    <div className="spaceUp">
                        <div>
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
                                </div>
                            </div>

                            <div className="row justify-content-between">
                                <p>Número de flota:</p>
                                <p>{loading ? data[id].nf : "loading..."}</p>
                            </div>

                            <div className="row justify-content-between">
                                <p>Placas:</p>
                                <p>{loading ? data[id].placa : "loading..."}</p>
                            </div>

                            <div className="row justify-content-between">
                                <p>Estado:</p>
                                <p>{loading ? data[id].estadoCar : "loading..."}</p>
                            </div>

                            <div className="row justify-content-between">
                                <p>Maximo de tanques:</p>
                                <p>{loading ? data[id].maxtanques : "loading..."}</p>
                            </div>

                            <div className="row justify-content-between" style={{marginBottom: 16}}>
                                <p>Ultimo mantenimiento:</p>
                                <p>{loading ? data[id].lastMaintenance : "loading..."}</p>
                            </div>

                            <div>
                                <button type="button" className="btn btn-primary" data-toggle="modal"
                                data-target="#myModal">
                                    Añadir
                                </button>
                            </div>



                            <div id="myModal" className="modal fade" role="dialog">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h4 className="modal-title">Asignar Empleado a Flota</h4>
                                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="input-group spaceUp">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">Cédula</span>
                                                </div>
                                            
                                                <input id="cedula" type="text" className="form-control" 
                                                placeholder="0999999999" pattern="([0-9]{10})"/>
                                            </div>
                                            <div className="spaceUp"/>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-primary" data-dismiss="modal"
                                            onClick={()=>{this.addEmpleado(this, firebase, data[id].placa)}}>
                                                Aceptar
                                            </button>
                                            <button type="button" className="btn btn-default" data-dismiss="modal">
                                                Cerrar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
           
        </>)
    }
}

export default withFirebase(DataFlota);