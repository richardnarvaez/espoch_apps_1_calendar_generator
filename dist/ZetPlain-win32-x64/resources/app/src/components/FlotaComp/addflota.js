import React from 'react'
import  { withFirebase } from '../Firebase';

class Add extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data: ""
        }            
    }

    submit(e, firebase){
        //e.preventDefault()
        var nf = document.getElementById("nf").value; //
        var placa = document.getElementById("placa").value; //
        var urlCar = document.getElementById("urlCar").value;
        var nowOrder = 0; //
        var numberofOrders = 0 //
        var estadoCar = "rodando"; //
        var lastMaintenance = "06/08/2019";//
        var isActive = "false" 
        var maxtanques = document.getElementById("maxtanques").value;

        if(urlCar == ""){
            urlCar = "https://as.com/epik/imagenes/2018/02/24/portada/1519476624_853121_1519476669_noticia_normal.jpg"
        }

        let dataFlota = { nf, placa, nowOrder, numberofOrders, estadoCar, lastMaintenance, 
            isActive, maxtanques, urlCar
        }
        
        console.log(">>>Se envio con exito<<<", dataFlota)

        firebase.setFlota("/flota/", dataFlota)

        alert('Se agrego con exito el empleado');
        
    }

    render(){
        return(<>
            <form  onSubmit={(e)=>{this.submit(e, this.props.firebase)}} className="container">
                <h2 className="spaceUp" style={{color:'#3941ca'}}>Datos de la unidad:</h2>

                <div className="input-group spaceUp">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Imagen de la Unidad url:</span>
                    </div>
                
                    <input id="urlCar" type="url" className="form-control" 
                    placeholder="https://example.com/example_image.jpg" />
                </div>

                <div className="input-group spaceUp">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Número de flota</span>
                    </div>
                    <input id="nf" type="text" className="form-control" required
                     placeholder="01" pattern="[0-9]{2}"/>
                </div>

                <div className="input-group spaceUp">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Placas</span>
                    </div>
                    <input id="placa" type="text" className="form-control" required
                    placeholder="TCD-0090" pattern="([A-Z]{3}-\d{3,4})"/>
                </div>

                <div className="input-group spaceUp">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Número máximo de tanques</span>
                    </div>
                    <input id="maxtanques" type="text" className="form-control" required
                    placeholder="40" pattern="[0-9]{1,2}"/>
                </div>

                <div className="spaceUp" style={{marginBottom: 16}}>
                    <input id="submit_button" type="submit" className="btn btn-primary btn-lg btn-block" value="Añadir"/>
                </div>
            </form>
        </>)
    }
}

export default withFirebase(Add)