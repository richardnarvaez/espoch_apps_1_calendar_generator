import React from 'react';
import  { withFirebase } from '../Firebase'
import Icon from '../../lib/svg';

import Navigation from '../Navigation';

class Stadistics extends React.Component{
    
  constructor(props) {
        super(props)
        this.state = {
          loading: true,       
          clients: "",          
          drivers: "",
          admins:"",
          views:"",
          orders:"",         
          product:"",
          data:"",  
          flota:"",      
        }
  }

  async componentDidUpdate(){
      
  }

  async componentDidMount(){
        this.props.firebase.getLive(
          "/orders",
          data=> {
              let num= data.numChildren();              
                this.props.firebase.db.ref('/statistics').update({
                  orders: num                    
              });                   
          },  

        error => console.log("Error: ", error))

        this.props.firebase.getLive(
          "/statistics/orders",
          orders=> {              
              this.setState({
                  orders: orders.val(),
                  loading: false
              })
          },           
      
        error => console.log("Error: ", error))

        this.props.firebase.getLive(
          "/users",
          data=> {
              let num= data.numChildren();               
                this.props.firebase.db.ref('/statistics').update({
                  clients: num                    
              });                   
          },  

        error => console.log("Error: ", error))

        this.props.firebase.getLive(
          "/statistics/clients",
          clients => {             
              this.setState({
                  clients: clients.val(),
                  loading: false
              })
          },           
      
        error => console.log("Error: ", error))

      
      this.props.firebase.getLive(
          "/store/category/gas",
          data=> {
              let num= data.numChildren();                                
                this.props.firebase.db.ref('/statistics').update({
                  products: num                    
              });                   
          },  

        error => console.log("Error: ", error))

        this.props.firebase.getLive(
          "/flota",
          data=> {
              let num= data.numChildren();                            
                this.props.firebase.db.ref('/statistics').update({
                  flota: num                    
              });                   
          },  

        error => console.log("Error: ", error))
      
      this.props.firebase.getLive(
          "/statistics/products",
          product => {
              this.setState({
                  product: product.val(),
                  loading: false                    
              })
          },           
      
        error => console.log("Error: ", error))

      
        this.props.firebase.getLive(
          "/statistics/flota",
          flota => {
              this.setState({
                  flota: flota.val(),
                  loading: false
              })
          },           
      
        error => console.log("Error: ", error))         
        this.props.firebase.getLive(
          "/statistics/clients",
          clients => {
              this.setState({
                  clients: clients.val(),
                  loading: false
              })
          },           
      
        error => console.log("Error: ", error))
      
        this.props.firebase.getLive(
          "/admins",
          data=> {
              let num= data.numChildren();                                
                this.props.firebase.db.ref('/statistics').update({
                  admins: num                    
              });                   
          },  

        error => console.log("Error: ", error))

        this.props.firebase.getLive(
          "/statistics/admins",
          admins=> {
              this.setState({
                  admins: admins.val(),
                  loading: false
              })
          },           
      
        error => console.log("Error: ", error))

            this.props.firebase.getLive(
          "/worker",
          data=> {
              let num= data.numChildren();                              
                this.props.firebase.db.ref('/statistics').update({
                  drivers: num                    
              });
                  
          },  

        error => console.log("Error: ", error))

        this.props.firebase.getLive(
          "/statistics/drivers",
          drivers => {
              this.setState({ 
                  drivers: drivers.val(),
                  loading: false
              })
          },            
        error => console.log("Error: ", error))

          .then(response => {
              console.log(response);
          }).catch(e => {
              console.log("Error");
              this.setState({
                  drivers: `Error: ${e}`,
                  views: `Error: ${e}`,
                  users: `Error: ${e}`,
                  orders: `Error: ${e}`,
                  clients: `Error: ${e}`,                   
                  loading: false,
              })
          })
  } 

  render() {
    const {loading, clients, orders, drivers, admins, flota, product} = this.state;   
          return (<> 
                  <div className="row">
                    <Navigation menu="stadistics"/>
                    <div className="col-10">
                    <div className = 'row'>                            
                      <img style={{objectFit: 'contain', borderRadius: '20px', width: '100px', height:'100px'}} src='https://d500.epimg.net/cincodias/imagenes/2015/05/08/pyme/1431098283_691735_1431098420_noticia_normal.jpg'/>
                      <p></p>                            
                      <h1 className='tiFuent' style={{color:'#56b889', fontSize:'30px'}}>  Estadistica Olmegas</h1>                                                                                  
                  </div>

                  <div className=' d-flex' style={{marginTop:'16px'}}>                            
                          <div className='divCont'>
                              <div>
                                  <h2 className='tiFuent'> Ordenes </h2>                                           
                              </div>  
                                
                              <div id='container'>
                                  <Icon className='iconIcon' name="sesion"  fill= "#56b889"/>                                        
                              </div>   

                              <div style={{marginLeft:'20px', marginTop:"-50px"}}>                                                                                                            
                                      <p className='parragraph'>{loading ? "Loading..." : orders} </p> 
                                      
                              </div>                                                                                                 
                          </div>
                            <div className='divCont'>
                              <div>
                                  <h2 className='tiFuent'> Administradores </h2> 
                              </div>                                   
                              <div id='container'>
                                  <Icon className="iconIcon" name="usuarios"  fill= "#56b889"/> 
                              </div>     
                              <div  style={{marginLeft:'20px', marginTop:"-50px"}}>                                                                                                       
                                    <p className='parragraph'>{loading ? "Loading..." :admins} </p>  
                              </div>                                                                                                           
                          </div>      

                            <div className='divCont'>
                              <div>
                                  <h2 className='tiFuent'> vehiculos </h2> 
                              </div>                                   
                              <div id='container'>
                                  <Icon className="iconIcon" name="pages"  fill= "#56b889"/> 
                              </div>     
                              <div  style={{marginLeft:'20px', marginTop:"-50px"}}>                                                                    
                                    <p className='parragraph'>{loading ? "Loading..." : flota} </p>  
                              </div>                                                                                                           
                          </div>                                             
                  </div>

                  <div className=' d-flex' style={{marginTop:'16px'}}>                            
                          <div className='divCont'>
                              <div>
                                  <h2 className='tiFuent'> Productos </h2> 
                              </div>                                   
                              <div id='container'>
                                  <Icon className="iconIcon" name="view"  fill= "#56b889"/> 
                              </div>     
                              <div  style={{marginLeft:'20px', marginTop:"-50px"}}>                                                                                                                                                                                                               
                                    <p className='parragraph'>{loading ? "Loading..." : product} </p>  
                              </div>                                                                                                        
                          </div>

                            <div className='divCont'>
                              <div>
                                  <p className='tiFuent'> Clientes </p> 
                              </div>                                   
                              <div id='container'>
                                  <Icon className="iconIcon" name="person"  fill= "#56b889"/> 
                              </div>     
                              <div  style={{marginLeft:'20px', marginTop:"-50px"}}>                                                                                                                                                                                                               
                                    <p className='parragraph'>{loading ? "Loading..." : clients} </p>  
                              </div>                                                                                                           
                          </div>      

                            <div className='divCont'>
                              <div>
                                  <h2 className='tiFuent'> Conductores </h2> 
                              </div>                                   
                              <div id='container'>
                                  <Icon className="iconIcon" name="car"  fill= "#56b889"/> 
                              </div>     
                              <div  style={{marginLeft:'20px', marginTop:"-50px"}}>                                                           
                                    <p className='parragraph'>{loading ? "Loading..." : drivers} </p>  
                              </div>                                                                                                           
                          </div>                            
                  </div>  
                    </div>
                  </div>
          
                                
      </>);
           
  }

}

export default withFirebase(Stadistics)