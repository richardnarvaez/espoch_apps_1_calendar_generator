import React from 'react'
// import NavLeft from '../components/DrawerView'

import Table from '../FlotaComp/tableflota'
import Add from '../FlotaComp/addflota'
import DataFlota from '../FlotaComp/infoFlota'

import Icon from '../../lib/svg';
import  { withFirebase } from '../Firebase';
import Navigation from '../Navigation';
class Flota extends React.Component{

  constructor(props){
      super(props)
      this.state={
          showdata: false,
          showadd: false,
          showsearch: true,
          data: [],
          dataflota:[],
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
      this.props.firebase.getLive("/flota",
          data => {
              if(data.exists()){
                console.log("FLOTA GETLIVE",Object.values(data.val()))
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

  async del(idFlota, workers, firebase){
      console.log("DEL FIREBASE", firebase)
      console.log("idFlota", idFlota)
      console.log("workers", workers)
      if (window.confirm("¿Desea eliminar la flota?")) {
        this.setState({showdata: false})
        var urlFlota = "/flota/"+idFlota
        if(workers != null){
            var idWorkers = Object.values(workers)
            console.log("WORKERS", idWorkers)
            firebase.deleteFlota(urlFlota, idWorkers)
            alert('Se elimino la flota de la base de datos');
        }else{
            firebase.delete(urlFlota)
            alert('Se elimino la flota de la base de datos');
        }
          
      } else {
          alert('Se cancelo la solicitud de borrar la flota');
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
      
      await firebase.search("/flota", type, search,
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
      if(type == "placa"){
          console.log("BORRAA placa")
          document.getElementById("dataSearch").value = ""
      }
      if(type == "nf"){
          console.log("BORRAA numero de flota")
          document.getElementById("dataSearch").value = ""
      }
  }
  

  render(){
      const {loading, data, id, notExist} = this.state
      
      return(<>
      
          <div className="row">
              
              <Navigation menu="flota"/>

              <div className= {"border-right scroll " + (this.state.showdata ? "col-6" : "col-10")} >
                  <div className="container ">
                      {/* Header */}
                          <div className="row d-flex align-items-center justify-content-between">    
                              <div>
                                  <h1 style={{color:'#3941ca'}}>Flota</h1>
                              </div>
                              {this.state.showsearch ?
                                  <div className= {"spaceUp " + (this.state.showdata ? "col-7" : "col-4")}>
                                      <div className="input-group row align-items-center justify-content-between"> 
                                          <div>
                                              <p>Buscar mediante:</p>
                                          </div>
                                          <form>
                                              <select className="custom-select" id="typeSearch"
                                              onChange={()=>{this.change()}}>
                                                  <option selected>Todos</option>
                                                  <option value="placa">Placa</option>
                                                  <option value="nf">Número de flota</option>
                                              </select>
                                          </form>
                                      </div>
                                      <div className="input-group spaceUp align-items-center">
                                          <input className="form-control" id="dataSearch"
                                          placeholder="Buscar Unidad" 
                                          pattern={this.state.scrh == "placa" ? "([A-Z]{3}-[0-9]{3,4})" :
                                          this.state.scrh == "nf" ? "([0-9]{2-5})" : ""}/>

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
                          <div className="row d-flex align-items-center ">
                              {this.state.showadd ?
                                  <div style={{padding: "8px"}}>
                                      <button className="btn btn-outline-primary"
                                      onClick={()=> {this.reload()}}>
                                          Retroceder
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
                          </div>
                      {/* Header */}
                       
                      {this.state.showadd ? 
                          <Add/>
                      : 
                          <Table callBack={this.show.bind(this)} 
                          loading={loading} data={data} notExist={notExist}
                          disarmClic={this.state.disarmClic}/>
                      }
                      
                  </div>
              </div>
  
          {/*Informacion de empleados y vehiculos*/}
              {this.state.showdata ? 
                  <DataFlota id={id} loading={loading} data={data} remove={this.del.bind(this)}
                  disarm={this.disarm.bind(this)}/>
              : 
                  null 
              }
          </div>
      </>)
  }
  
}

export default withFirebase (Flota)