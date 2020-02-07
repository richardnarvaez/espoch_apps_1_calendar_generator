import React from 'react';
import Icon from '../../lib/svg';
import  { withFirebase } from '../Firebase';
import CardNotify from '../NotifyComp/CardNotify';
import MsmNotify from '../NotifyComp/MsmNotify';
import Nodata from '../NotifyComp/Nodata';
import Navigation from '../Navigation';


class notifications extends React.Component{

    constructor(props){
        super(props)
        console.log("Constructor")
        this.state = {
          loading: true,
          data: [] ,
          messages: [],
          ModalState: false,
          idI: null,
          error: false,
          obUser: false,
        }
        
    }

    async componentDidUpdate(){
    }

    async componentDidMount(){
        {/**peticion de datos */}
        await this.props.firebase.getLive(
            "/notify",
            data => {
                if (data.exists()) {
                    this.setState({
                    
                        data: Object.values(data.val()).reverse(),
                        loading: false,
                        error: false,
                    })
                }
                else
                {
                    this.setState({
                    
                        data: null,
                        loading: false,
                        error: false,
                    })
                    
                }
            },
            error => console.log("Error: ", error))
            .then(response => {
                console.log(response);
            }).catch(e => {
                console.log("Error");
                this.setState({
                    data: `Error: ${e}`,
                    loading: false,
                    error: true,
                })
            })
            
    }

    

    async getdatafilter(ctx, firebase){
        let valuefilter=document.getElementById("filtero").options[document.getElementById("filtero").selectedIndex].text
      
        await firebase.getfilter("/notify", valuefilter,
        data=>{ 
            if ( data.val()!=null && data.val()!= undefined ){
                console.log("CAMBIO DE FILTRO",data.val())
                ctx.setState({
                    data: Object.values(data.val()).reverse(),
                    loading: false,
                    error: false,
                    obUser: false,
                })
            }
            else
            {
                ctx.setState({
                    error: true,
                    loading: false
                   
                })
            }  
            
            },
        error=>{console.log("Error",error);})
    }


    render(){
        const {loading, data,error} = this.state
        return (<>

        <div className="d-flex row">
        
            <Navigation menu="notifications"/>
            
            <div className="d-felx col-10">
            
            {/* Header */}
                <div style={{height: 140}}>
                    <div className="d-flex align-items-center  container justify-content-between border-bottom">
                        <div>
                            
                            <h1 style={{color:'#3941ca'}}><span><Icon name="empleado" fill="#0062ff"/></span> NOTIFICACIONES</h1>
                            <h2>Lista de empleados y clientes</h2>
                        </div>
                        {/*<div>
                            <button type="button" className="btn btn-outline-primary" style={{marginRight: 54}}>Actualizar</button>
                        </div>*/}
                    </div>
                
                    
                {/*buscar en la notificacion */}
                    <div className="row align-items-center d-flex justify-content-between align-items-middle">
                        <div className="col-3 ">
                        
                            <form>
                            
                                <div className="form-group">
                                    <text>Buscar Notificación</text>
                                    <small className="form-text text-muted">Seleccione el filtro a buscar </small>
                                    
                                </div> 
                            </form>
                        </div>

                        <div style={{top: 8}} className="col-4">
                            <div className="btn-group">
                                <div className="input-group mb-3">
                                    <select className="custom-select" id="filtero" 
                                        onChange={()=>{
                                            this.setState({loading: true})
                                            this.getdatafilter(this, this.props.firebase)
                                        }}>
                                        <option defaultValue>Todos</option>
                                        {/*<option value="1">Empleado</option>*/}
                                        <option value="2">Cliente</option>
                                        <option value="3">Emergencia</option>
                                        {/*<option value="4">Estado</option>    */}                                    
                                    </select>
                                    <div className="input-group-append">
                                        <label className="input-group-text">Opciones</label>
                                    </div>
                                </div>
                            </div> 
                        </div>

                        {/*<div className="col-2">
                            <div>
                                <button type="button" className="btn btn-outline-primary">                                                                  
                                BUSCAR</button>
                            </div>
                        </div>

                        <div className="col-2">
                            <div>
                                <button type="button" className="btn btn-outline-primary"
                                    value="Focus the text input"
                                    onClick={this.clearText}
                                    >BORRAR 
                                </button>
                            </div>
                        </div>*/}
                    </div>
                    </div>
                {/* Header */}
                {/*Objetos de la tabla */}
                
                <div style={{padding: '6px 0', height: 40}} className="row align-items-center align-items-middle d-flex justify-content-between border-top border-bottom">
                    <div className= "col-3">
                        <text>Nombre</text>
                    </div>

                    <div className= "col-1">
                        <text>Tipo</text>
                    </div>

                    <div className= "col-1">
                        <text>Fecha</text>
                    </div>

                    <div className= "col-2">
                        <text>Usuario</text>
                    </div>
                </div>

                <div style={{height: "calc(100vh - 180px)"}} className="scroll">
                    {/*Lista de las notificaciones */}
                    {/*error */}
                    
                    {!error ? null : 
                        
                       <Nodata onClick={()=>this.setState({error: false})}></Nodata>
                        
                    }
                    {/*mensaje */}
                    
                    {loading ? 
                        <div>Cargando...</div> 
                    : 
                        (data == null ? <div>No existen datos</div>:  data.map((item,i) =>{
                            return(<CardNotify key={i} loading={loading} data={item} onClick={()=> {
                                this.setState({ModalState: !this.state.ModalState, idI:i})       
                            }}></CardNotify>)
                        }))


                       }
                    {/*tarjeta1 */}
                    
                    {this.state.ModalState? <MsmNotify loading={loading} data={data[this.state.idI]}
                        onClick={()=> {this.setState({ModalState: !this.state.ModalState})
                        }}></MsmNotify>
                    : 
                        null
                    }
                                      
                </div>
                    
            </div>
            
        </div>
        </>)
    }
}


export default withFirebase (notifications)