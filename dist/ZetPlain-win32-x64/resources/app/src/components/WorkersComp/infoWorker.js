import React from 'react'
import Star from "../FlotaComp/progressStar"
import Icon from '../../lib/svg'
import EditWorker from './editWorker'


class DataWorker extends React.Component{
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
        const {loading, data, id} = this.props
        return(<>
            <div className="col-4 scroll">
                {this.state.showedit ? 
                    <EditWorker back={this.back.bind(this)}
                    success={this.success.bind(this)}
                    loading={loading} data={data} id={id}/>
                : 
                    <Data remove={this.props.remove.bind()} 
                    callBack={this.showE.bind(this)}
                    loading={loading} data={data} id={id}/> 
                }
            </div>
        </>)
    }
}

class Data extends React.Component{
    constructor(props){
        super(props)          
    }

    progress(start, end){
        var porcent = ((start*100)/end)
        console.log("porcent",porcent)
        return(porcent+"%")
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
                        <div id="clicEdit" 
                        onClick={()=> {this.props.callBack()}}>
                            <Icon name="account-edit" fill="#fffff"/>
                        </div>
                        <div id="clicDel"
                        onClick={()=> {this.props.remove(data[id].id, data[id].idFlota)}}>
                            <Icon name="account-delete" fill="#fffff"/> 
                        </div>
                    </div>
                </div>
                {/* Header */}
                    
                <div>
                    <div className={"spaceUp row align-items-center"}>
                        <div className="col-2">
                            <img className={"imgflota"}
                                src= {loading ? data[id].urlEmpleado : null}>
                            </img>
                        </div>
                        <div className="col-10">
                            <p id="nameinfoflota">{loading ? data[id].firstName +" " + data[id].lastName : "loading..."}</p> 
                        </div>                            
                    </div>
                </div>
                    

                <div className={"spaceUp"}>
                    <div className="row justify-content-between">
                        <p>Flota de trabajo:</p>
                        <p>{loading ? (data[id].idFlota != null ? data[id].idFlota : "Sin asignar") : "loading..."}</p>
                    </div>

                    <div className="row justify-content-between">
                        <p>Cedula de Indentidad:</p>
                        <p>{loading ? data[id].cedula : "loading..."}</p>
                    </div>

                    <div>
                        <p>Datos de licencia:</p>
                        <div className="container">
                            <div className="row justify-content-between">
                                <p>Categoria:</p>
                                <p>{loading ? data[id].licencia : "loading..."}</p>
                            </div>

                            <div className="row justify-content-between">
                                <p>Fecha de expiracion:</p>
                                <p>{loading ? data[id].dateOfEx : "loading..."}</p>
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
                        <p>{loading ? data[id].celular : "loading..."}</p>
                    </div>

                    <div className="row justify-content-between">
                        <p>Correo:</p>
                        <p>{loading ? data[id].email : "loading..."}</p>
                    </div>
                    
                </div>
            </div>
        </>)
    }
}

export default (DataWorker);