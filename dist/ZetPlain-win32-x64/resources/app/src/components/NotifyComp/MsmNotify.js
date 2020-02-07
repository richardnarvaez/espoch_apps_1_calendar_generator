import React from 'react';
import Icon from '../../lib/svg';
import  { withFirebase } from '../Firebase'


class MsmNotify extends React.Component{
    constructor (props){
        super(props)
        this.state={
            infoUser: [],
            loading: true,
            error: false,
            user:  false,
        }
    }

    async componentDidMount(){
     
        {/**peticion de datos a user  */}
        if (this.props.data.type === "Cliente")
        {
        (await this.props.firebase.getLive(
            "/users/"+this.props.data.uid,
            //obtiens los datos
            data => {
                
                    this.setState({
                    //Asigno
                    infoUser: data.val(),
                    loading: false,
                    error: false,
                    user: true,
                })
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
            }))
        }
        else
        { 
        await this.props.firebase.getLive(
            "/worker/"+this.props.data.uid,
            //obtiens los datos

            data => {
                if (data.exists())
                {
                    this.setState({
                        //Asigno
                        infoUser: data.val(),
                        loading: false,
                        error: false,
                    })
                }
                else
                {
                    this.setState({
                        //Asigno
                        infoUser: null,
                        loading: false,
                        error: false,
                    })
                }
               
            },
            error => console.log("Error: ********", error))
            .then(response => {
                console.log(response);
            }).catch(e => {
                console.log("DA ERROR Error-----",e);
                this.setState({
                    data: `Error: ${e}`,
                    loading: false,
                    error: true,
                })
            })
        }
            
    }

    asignarCredit(firebase){
        let url='/users/'+this.state.infoUser.uid+'/checkout'
        firebase.setCredit(url)

    }

    deleteCredit(firebase){
        let url='/users/'+this.state.infoUser.uid+'/checkout/'
        firebase.setQuitarCredit(url)
    }
    
   

    renderUser(loading, data, infoUser){
        const fecha = (new Date(data.date))
        return(
            <div  className={"align-items-center"}style={{justifyContent: "center" , height: "100vh", top: 0, bottom: 0, left: 0, right: 0, zIndex: 200, position: "absolute", display: "flex"}} >
            <div style={{justifyContent: "center" , height: "100vh", background: "#00000025", top: 0, bottom: 0, left: 0, right: 0, zIndex: 100, position: "absolute",}} onClick={()=> {this.props.onClick()}}/>
                <div className="card d-flex align-items-center" style={{width: "450px", background: "#fff",zIndex: 100}}>
            
                    <div className= " ">
                        <div className="d-flex flex-row align-items-center align-items-middle">
                            <div>
                            <img className= "image" src={ loading ? "Loading..." :  infoUser.photoURL}/>
                            </div>
                            <div>
                                <text style={{marginLeft: 6,}} className="font-weight-bold">{loading ? "Loading..." :  infoUser.name}</text>
                                <p style={{marginLeft: 6,  color: "#000000"}} className="font-weight-normal">{loading ? "Loading...": infoUser.email}</p>
                            </div>
                        </div>
                    </div>

                    <div className="col align-items-center align-items-middle d-flex justify-content-between">
                        <text className="font-weight-normal">Ruc: {loading ? "Loading..." : data.ruc}</text>
                        <text className="font-weight-normal">Local: {loading ? "Loading..." : data.local}</text>
                    </div>

                    <div className="col align-items-center align-items-middle d-flex justify-content-between">
                        <text className="font-weight-normal">Gases: {loading ? "Loading..." : data.cgases}</text>
                        <text className="font-weight-normal">Saldo: {loading ? "Loading..." : data.saldo}</text>
                    </div>

                    <div className= "col align-items-center align-items-middle d-flex justify-content-between">
                        <text className="font-weight-normal">Tipo: {loading ? "Loading..." : data.type}</text>
                        <text className="font-weight-normal">Fecha: {loading ? "Loading..." : fecha.toLocaleDateString()} </text>
                            
                    </div>

                    <div  className= "col align-items-center align-items-middle d-flex justify-content-between">
                        <text>Ciudad: Riobamba</text>
                        <text>Telefono: {loading ? "Loading..." : data.telefono}</text>
                    </div>

                    {/*<div  className= "col align-items-center align-items-middle">
                        <p>
                            Estrellas: {loading ? "Loading..." : data.start}
                            <Icon name="star" fill="#fbdc04"/>
                        </p>
                    </div>*/}

                    <div  className= "col align-items-center align-items-middle d-flex justify-content-between">
                        <button type="button" class="btn btn-outline-primary"
                            onClick={()=>{(this.asignarCredit(this.props.firebase))
                            this.props.onClick()
                            }}
                            disabled={infoUser.checkout == null ? false : (infoUser.checkout.aCredit ? true : false)}
                            >Aceptar
                        </button>
                        <button type="button" class="btn btn-outline-dark"
                            onClick={()=>{( this.props.onClick())
                            }}
                            >Salir
                        </button>
                    </div>

                    <div className= "row">
                        <button type="button" class="btn btn-danger"
                            onClick={()=>{(this.deleteCredit(this.props.firebase))
                            this.props.onClick()
                            }}
                            disabled={infoUser.checkout == null ? false : (infoUser.checkout.aCredit ? false : true)}
                            >Quitar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    renderWorker(loading, data, infoUser){
      
        const fecha = (new Date(data.date))
        return(<>
            {this.state.infoUser != null ?
            <div  className={"align-items-center"}style={{justifyContent: "center" , height: "100vh" , top: 0, bottom: 0, left: 0, right: 0, zIndex: 200, position: "absolute", display: "flex",}} >
            <div style={{justifyContent: "center" , height: "100vh", background: "#00000025", top: 0, bottom: 0, left: 0, right: 0, zIndex: 100, position: "absolute",}} onClick={()=> {this.props.onClick()}}/>
                <div className="card d-flex align-items-center" style={{width: "450px", background: "#fff",zIndex: 100,}}>
                    <div className= " ">
                        <div className="d-flex flex-row align-items-center align-items-middle">
                            <div>
                            <img className= "image" src={ loading ? "Loading..." : this.state.infoUser.urlEmpleado == "" ?
                                    "https://thumbs.dreamstime.com/z/trabajador-de-construcci%C3%B3n-icon-ejemplo-de-person-profile-avatar-del-vector-97315504.jpg"
                                :  infoUser.urlEmpleado}/>
                            </div>
                            <div>
                                <text style={{marginLeft: 6,}} className="font-weight-bold">{loading ? "Loading..." : infoUser.firstName +" " +infoUser.lastName}</text>
                                {/*<text style={{marginLeft: 6,}} className="font-weight-bold">{loading ? "Loading..." :  infoUser.lastName}</text>*/}
                                <p style={{marginLeft: 6,  color: "#000000"}} className="font-weight-normal">{loading ? "Loading...": this.state.infoUser.urlEmpleado == "" ? "PONMENOMBRE@GMAIL.COM" : infoUser.email}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col align-items-center align-items-middle d-flex justify-content-between">
                        <text className="font-weight-normal">Cedula: {loading ? "Loading..." : infoUser.cedula}</text>
                        <text className="font-weight-normal">Ciudad: Riobamba</text>
                    </div>

                    <div className= "col align-items-center align-items-middle d-flex justify-content-between"> 
                            <text className="font-weight-normal">Tipo: {loading ? "Loading..." : data.type}</text>
                            <text className="font-weight-normal">Fecha: {loading ? "Loading..." : fecha.toLocaleDateString()} </text>
                    </div>
                
                    <div  className= "col align-items-center align-items-middle d-flex justify-content-between">
                        <text>Telefono: {loading ? "Loading..." :  infoUser.celular}</text>
                        <text>Placa: {loading ? "Loading..." : infoUser.idFlota}</text>
                    </div>

                    <div  className= "col align-items-center align-items-middle d-flex justify-content-between">
                        <text>
                            Licencia: {loading ? "Loading..." : infoUser.licencia}
                        </text>
                    </div>
                   
                    <div className="font-weight-bold">
                        <text>
                            Mensaje: {loading ? "Loading..." : data.msg}
                        </text>
                    </div>

                    {/*<div  className= "">
                        <p>
                            Estrellas:
                            <Icon name="star" fill="#fbdc04"/>
                        </p>
                       
                    </div>*/}

                </div>
            </div>
            :

            <div  className={"align-items-center"}style={{justifyContent: "center" , height: "100vh" , top: 0, bottom: 0, left: 0, right: 0, zIndex: 200, position: "absolute", display: "flex",}} >
            <div style={{justifyContent: "center" , height: "100vh", background: "#00000025", top: 0, bottom: 0, left: 0, right: 0, zIndex: 100, position: "absolute",}} onClick={()=> {this.props.onClick()}}/>
                <div className="card d-flex align-items-center" style={{width: "450px", background: "#fff",zIndex: 100,}}>
                    <div className= " ">
                        {/*
                        <div className="d-flex flex-row align-items-center align-items-middle">
                            <div>
                            <img className= "image" src={ loading ? "Loading..." : "https://thumbs.dreamstime.com/z/trabajador-de-construcci%C3%B3n-icon-ejemplo-de-person-profile-avatar-del-vector-97315504.jpg"}/>
                            </div>
                            <div>
                                <text style={{marginLeft: 6,}} className="font-weight-bold">{loading ? "Loading..." : "Usuario Borrado"}</text>
                                {<text style={{marginLeft: 6,}} className="font-weight-bold">{loading ? "Loading..." :  infoUser.lastName}</text>}
                                <p style={{marginLeft: 6,  color: "#000000"}} className="font-weight-normal">{loading ? "Loading...":"PONMENOMBRE@GMAIL.COM" }</p>
                            </div>
                        </div>
                    </div>
                    <div className="col align-items-center align-items-middle d-flex justify-content-between">
                        <text className="font-weight-normal">Cedula: {loading ? "Loading..." : "0000000000"}</text>
                        <text className="font-weight-normal">Ciudad: Riobamba</text>
                    </div>

                    <div className= "col align-items-center align-items-middle d-flex justify-content-between"> 
                            <text className="font-weight-normal">Tipo: {loading ? "Loading..." : data.type}</text>
                            <text className="font-weight-normal">Fecha: {loading ? "Loading..." : fecha.toLocaleDateString()} </text>
                    </div>
                
                    <div  className= "col align-items-center align-items-middle d-flex justify-content-between">
                        <text>Telefono: {loading ? "Loading..." :  "Borrado"}</text>
                        <text>Placa: {loading ? "Loading..." : "Borrado"}</text>
                    </div>

                    <div  className= "col align-items-center align-items-middle d-flex justify-content-between">
                        <text>
                            Licencia: {loading ? "Loading..." : "Borrado"}
                        </text>
                        </div>*/}
                    </div>
                   
                    <div className="font-weight-bold">
                        <text>
                            Mensaje: {loading ? "Loading..." : data.msg}
                        </text>
                    </div>

                    {/*<div  className= "">
                        <p>
                            Estrellas:
                            <Icon name="star" fill="#fbdc04"/>
                        </p>
                       
                    </div>*/}

                </div>
            </div>


            }
        </>)
    }

    render(){
        const {loading, data} = this.props
        

        return(<>
            { (this.state.user)?
                this.renderUser(loading, data, this.state.infoUser)
            :
            
                this.renderWorker(loading, data, this.state.infoUser)
            }
            
        </>)
    }
}

export default withFirebase (MsmNotify)