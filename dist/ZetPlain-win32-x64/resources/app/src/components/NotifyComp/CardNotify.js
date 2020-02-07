import React from 'react';
//import '../static/css/index.css';
import Icon from '../../lib/svg';
import  { withFirebase } from '../Firebase'
//import { url } from 'inspector';


class CardNotify extends React.Component{
    constructor (props) {
        super(props)
        this.state={
            infoUser: [],
            loading: true,
            error: false,
            user:  false,
            dataUpdate: false,
            colorAcredit: true,
             
        }
    }
    
    async componentDidMount(){
        

        {/**peticion de datos a user  */}
        if (this.props.data.type === "Cliente")
        {
        (await this.props.firebase.get(
            "/users/"+this.props.data.uid,
            //obtiens los datos
            data => {
                this.setState({
                    //Asigno
                    infoUser: data.val(),
                    loading: false,
                    error: false,
                    user: true,
                    dataUpdate: true
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
                    dataUpdate: true
                })
            }))
        } else {
           
        await this.props.firebase.get(
            "/worker/"+this.props.data.uid,
            //obtiens los datos
            data => {
               
                this.setState({
                    //Asigno
                    infoUser: data.val(),
                    loading: false,
                    error: false,
                    user:false,
                    dataUpdate: true
                })
            },
            error => console.log("Error Peticion worker1 ", error))
            
            .catch(e => {
                
                
                this.setState({
                    data: `Error: ${e}`,
                    loading: false,
                    error: true,
                    dataUpdate: true
                })
            })
        }   
    }

    async componentDidUpdate(prevState){
        if( prevState.data.uid != this.props.data.uid){
            
          
        {/**peticion de datos a user  */}
        if (this.props.data.type === "Cliente"){
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
                    dataUpdate: true
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
                    user: false,
                    dataUpdate: true
                })
            }))
        } else {
            
        (await this.props.firebase.get(
            "/worker/"+this.props.data.uid,
            //obtiens los datos
            
            data => {
                if(data.exists()){
                    this.setState({
                        //Asigno
                        infoUser: data.val(),
                        loading: false,
                        error: false,
                        user: false,
                        dataUpdate: true
                    })
                }else
                {
                    this.setState({
                        //Asigno
                        infoUser: null,
                        loading: false,
                        error: false,
                        user: false,
                        dataUpdate: true
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
                    user: false,
                    dataUpdate: true
                })
            }))
        }   
        }
    }

    renderUser(loading, data, infoUser){
        const fecha = (new Date(data.date))
        
        return(<>
          
            <div  onClick={()=> {this.props.onClick()}} style={{padding: 6,}} className="row align-items-center d-flex justify-content-between border-bottom ">
                
                <div className= "col-3 ">
                    <div className="d-flex flex-row ">
                        <div>
                            <img className= "image" src={loading ? "Loading..." 
                            : this.state.infoUser.photoURL}/>
                        </div>
                        <div>
                            <p style={{marginLeft: 6,}} className="font-weight-bold">{loading ? "Loading..." :  infoUser.name}</p>
                            <p style={{marginLeft: 6,}} className="font-weight-normal">{loading ? "Loading...": infoUser.email}</p>
                        </div>
                    </div>
                </div>
                
                <div className= "col-1">
                    <div>
                        <p className="font-weight-normal">{loading ? "Loading..." : data.type}</p>
                    </div>     
                </div>

                <div className= "col-1">
                    
                    <p className="font-weight-normal">{loading ? "Loading..." : fecha.toLocaleDateString()} </p>
                </div>

                <div  className= "col-2">
                    <p>
                        {loading ? "Loading..." : <Icon name="user" fill={infoUser.checkout == null ? '#fbdc04' : (infoUser.checkout.aCredit ? '#25e802' : '#fbdc04')} />}
                    </p>
                </div>
                
            </div>       

        </>)
    }

    renderWorker(loading, data, infoUser){
        
        const fecha = (new Date(data.date))
        return(<>
            {this.state.infoUser != null ?
            <div  onClick={()=> {this.props.onClick()}} style={{padding: 6,}} className="row align-items-center d-flex justify-content-between border-bottom ">
                
               
                <div className= "col-3 ">
                    <div className="d-flex flex-row ">
                        <div>      
                            <img className= "image" src={loading ? 
                                "Loading..." 
                            :
                              this.state.infoUser.urlEmpleado == "" ?
                                    "https://thumbs.dreamstime.com/z/trabajador-de-construcci%C3%B3n-icon-ejemplo-de-person-profile-avatar-del-vector-97315504.jpg"
                                :
                                    this.state.infoUser.urlEmpleado}/>
                        </div>
                        <div>
                            <p style={{marginLeft: 6,}} className="font-weight-bold">{loading ? "Loading..." :infoUser.firstName +" "+infoUser.lastName}</p>
                            {/*<p style={{marginLeft: 6,}} className="font-weight-bold">{loading ? "Loading..." : infoUser.lastName}</p>*/}
                            <p style={{marginLeft: 6,}} className="font-weight-normal">{loading ? "Loading..." :infoUser.email}</p>
                        </div>
                    </div>
                </div>
                
                <div className= "col-1">
                    <div>
                        <p className="font-weight-normal">{loading ? "Loading..." : data.type}</p>
                    </div>     
                </div>

                <div className= "col-1">
                    
                    <p className="font-weight-normal">{loading ? "Loading..." : fecha.toLocaleDateString()} </p>
                </div>

                <div  className= "col-2">
                    <p>
                        {loading ? "Loading..." : <Icon name="empleado" fill="#4545ff "/>}
                    </p>
                </div>
                
              
            </div>
            :
            <div  onClick={()=> {this.props.onClick()}} style={{padding: 6,}} className="row align-items-center d-flex justify-content-between border-bottom ">
                
               
            <div className= "col-3 ">
                <div className="d-flex flex-row ">
                    <div>      
                        <img className= "image" src={"https://image.flaticon.com/icons/svg/2037/2037451.svg"
                            }/>
                    </div>
                    <div>
                        <p style={{marginLeft: 6,}} className="font-weight-bold">{loading ? "Loading..." :"Usuario Borrado"}</p>
                        {/*<p style={{marginLeft: 6,}} className="font-weight-bold">{loading ? "Loading..." : infoUser.lastName}</p>*/}
                        <p style={{marginLeft: 6,}} className="font-weight-normal">{loading ? "Loading..." :"Usuario Borrado"}</p>
                    </div>
                </div>
            </div>
            
            <div className= "col-1">
                <div>
                    <p className="font-weight-normal">{loading ? "Loading..." : data.type}</p>
                </div>     
            </div>

            <div className= "col-1">
                
                <p className="font-weight-normal">{loading ? "Loading..." : fecha.toLocaleDateString()} </p>
            </div>

            <div  className= "col-2">
                <p>
                    {loading ? "Loading..." : <Icon name="empleado" fill="#4545ff "/>}
                </p>
            </div>
            
          
        </div>  }

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

export default withFirebase (CardNotify)