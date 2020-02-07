import React from 'react'
import Table from '../WorkersComp/tableWorker'
import Add from '../WorkersComp/addWorker'
import DataWorker from '../WorkersComp/infoWorker'
import Icon from '../../lib/svg';
import Navigation from '../Navigation';

import  { withFirebase } from '../Firebase';

class Worker extends React.Component{
    constructor(props){
        super(props)
        this.state={
            showdata: false,
            showadd: false,
            showsearch: true,

            data: [],
            loading: false,
            id: null,

            notExist: false,

            disarmClic: false,

            scrh: "Todos",
        }            
    }

    async componentDidMount(){
        //if(this.state.data){
          //  return
        //}
        this.props.firebase.getLive("/worker",
            data => {
                if(data.exists()){
                    console.log("WORKERS GETLIVE",Object.values(data.val()))
                
                    this.setState({
                    data: Object.values(data.val()),
                    loading: true
                    })
                }else{
                    this.setState({data: [], notExist: true, loading: false})
                }
                
            },
            error => console.log("Error: ", error))
            .then(response => {
                console.log(response);
            }).catch(e => {
                console.log("Error");
                this.setState({
                    data: `Error: ${e}`,
                    loading: false
                })
            })
    }

    del(idWorker, idFlota){
        if (window.confirm("¿Desea eliminar al empleado?")) {
            this.setState({showdata: false})
            console.log("IDFLOTA", idFlota)
            if(idFlota != null){
                var urlWorker = "/worker/"+idWorker
                var urlFlota = "/flota/"+idFlota+"/workers/"+idWorker
                this.props.firebase.deleteWorker(urlWorker, urlFlota)
                alert('Se elimino el empleado de la base de datos');
            }else{
                var urlWorker = "/worker/"+idWorker
                this.props.firebase.delete(urlWorker)
                alert('Se elimino el empleado de la base de datos');
            }
            
        } else {
            alert('Se cancelo la solicitud de borrar empleado');
        }
    }

    show(key){
        this.setState({showdata: true})
        this.setState({id: key})
    }

    agg(){
        this.setState({showadd: true})
        this.setState({showdata: false})
        this.setState({showsearch: false})
    }

    reload(){
        this.setState({showadd: false})
        this.setState({showsearch: true})
    }

    disarm(boolean){
        {boolean ? this.setState({disarmClic: true }) : this.setState({disarmClic: false })}
    }

    async getdatafilter(ctx, firebase){
        this.setState({showdata: false})
        console.log("========>",ctx.type)
        let search = document.getElementById("dataSearch").value

        console.log("dataSearch", search)

        console.log("valuefilter", this.state.scrh)
        let type = ctx.type

        console.log("valuefilter", type)
        
        await firebase.search("/worker", type, search,
        data=>{ 
            if ( data.val()!=null && data.val()!= undefined ){
                console.log("DATADATA",data.val())
                ctx.setState({
                    data: Object.values(data.val()),
                    loading: true,
                    notExist: false,
                    error: false,
                })
            }
            else
            {
                ctx.setState({
                    error: true,
                    loading: false,
                    notExist: true,
                })
            }  
            },
        error=>{console.log("Error",error);})
    }

    change(){
        var type = document.getElementById("typeSearch").value
        console.log("x", type)

        this.setState({scrh: type})

        this.type = type 

        console.log("change_type_srch", this.state.scrh)

        console.log("change_type_x", type)
        if(type == "Todos"){
            console.log("BORRAAAAAAAAAAAAAAAAAAAAAAAAA")
            document.getElementById("dataSearch").value = ""
            this.getdatafilter(this, this.props.firebase) 
        }
        if(type == "cedula"){
            console.log("BORRAA cedula")
            document.getElementById("dataSearch").value = ""
        }
        if(type == "idFlota"){
            console.log("BORRAA placa")
            document.getElementById("dataSearch").value = ""
        }
    }
    

    render(){
        const {loading, data, id, notExist} = this.state
        
        return(<>
        
            <div className="row">
                
                 <Navigation menu="workers"/>

                <div className= {"border-right scroll " + (this.state.showdata ? "col-6" : "col-10")} >
                    <div className="container ">
                        {/* Header */}
                            <div className="row d-flex align-items-center justify-content-between">    
                                <div>
                                    <h1 style={{color:'#3941ca'}}>Empleados</h1>
                                </div>
                                {this.state.showsearch ?
                                    <div className= {"spaceUp " + (this.state.showdata ? "col-5" : "col-3")}>
                                        <div className="input-group row align-items-center justify-content-between"> 
                                            <div>
                                                <p>Buscar mediante:</p>
                                            </div>
                                            <form>
                                                <select className="custom-select" id="typeSearch"
                                                onChange={()=>{this.change()}}>
                                                    <option selected>Todos</option>
                                                    <option value="idFlota">Placa</option>
                                                    <option value="cedula">Cédula</option>
                                                </select>
                                            </form>
                                        </div>
                                        <div className="input-group spaceUp align-items-center">
                                            <input className="form-control" id="dataSearch"
                                            placeholder="Buscar Unidad" 
                                            pattern={this.state.scrh == "idFlota" ? "([A-Z]{3}-[0-9]{3,4})" :
                                            this.state.scrh == "cedula" ? "([0-9]{10})" : ""}/>

                                            <div className="clicSearch">

                                                <button className="btn btn-outline-primary"
                                                onClick={()=>{this.getdatafilter(this, this.props.firebase)}}
                                                   disabled={this.state.scrh != "Todos" ? false : true}>
                                                    <Icon name="magnify" fill="#3941ca"/>
                                                </button>
                                            </div>
                                        </div>
                                    </div>   
                                :
                                    null
                                }
                            </div>

                            {/*<div className="row d-flex align-items-center ">
                                {this.state.showadd ?
                                    <div style={{padding: "8px"}}>
                                        <button className="btn btn-outline-primary"
                                        onClick={()=> {this.reload()}}>
                                            Back
                                        </button>
                                    </div>
                                : 
                                    null
                                }
                                <div style={{padding: "8px"}}>
                                    <button className="btn btn-outline-primary"
                                    onClick={()=> {this.state.disarmClic ? alert("Se encuentra editando la informacion de un empleado") :
                                    this.agg()}}>
                                        Agregar
                                    </button>
                                </div>
                            </div>*/}

                        {/* Header */}
                         
                        {/*this.state.showadd ? 
                            <Add/>
                        : 
                            <Table callBack={this.show.bind(this)} 
                            loading={loading} data={data} notExist={notExist}
                            disarmClic={this.state.disarmClic}/>
                        */}
                        
                        <Table callBack={this.show.bind(this)} 
                            loading={loading} data={data} notExist={notExist}
                            disarmClic={this.state.disarmClic}/>
                        
                    </div>
                </div>
    
            {/*Informacion de empleados y vehiculos*/}
                {this.state.showdata ? 
                    <DataWorker id={id} loading={loading} data={data} remove={this.del.bind(this)}
                    disarm={this.disarm.bind(this)}/>
                : 
                    null 
                }
            </div>
        </>)
    }
    
}

export default withFirebase (Worker)