import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

import XLSX from 'xlsx';
import { make_cols } from './../../MakeColumns';
import { SheetJSFT } from './../../types';

import { compose } from 'recompose';

import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../Session';

class Landing extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      generar: false,
      file: {},
      data: [],
      cols: []
    }
    this.handleFile = this.handleFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){

  }

  toggleClick = ()=> {
    this.setState(state => ({
      generar: !state.generar
    }));
  }

  handleChange(e) {
    const files = e.target.files;
    if (files && files[0]) this.setState({ file: files[0] }); 
  };

  componentDidUpdate(prevProps, prevState){

    console.log("FILE: ", this.state.file.size)
    console.log("DATA: ", this.state.data.length)
    console.log("PREVDATA: ", prevState.data.length)
    console.log("DATA: ", this.state.data)

    if(prevState.data.length == 0 && this.state.data.length > 0){
        console.log("DATA: ", this.state.data.length)
      let allMaterias = [];
      let allMatRows = [];
      for(let i = 7; i<= this.state.data.length - 1; i ++){
        console.log("I: ", i)
        console.log("DATOS FIJOS: ", this.state.data[i])

        // for(let m = 0 ; m<= Object.keys(this.state.data[i]).length -1; m++){
        //   console.log(`${i}: ${Object.keys(this.state.data[i])[i]}`);
          
        // }
        let rowMats = [null, null, null, null, null, null, null, null]
        Object.keys(this.state.data[i]).forEach(key => {

          let value = this.state.data[i][key];
          switch(key){
            case "__EMPTY_1":
              rowMats[0] = value
            break;
            case "__EMPTY_4":
              rowMats[1] = value
            break;
            case "__EMPTY_8":
              rowMats[2] = value
            break;
            case "__EMPTY_9":
              rowMats[3] = value
            break;
            case "__EMPTY_11":
              rowMats[4] = value
            break;
            case "__EMPTY_12":
              rowMats[5] = value
            break;
            case "__EMPTY_13":
              rowMats[6] = value
            break;
            case "__EMPTY_14":
              rowMats[7] = value
            break;

          }
          console.log("ROW: ", rowMats)
          
          //console.log(">>>>>>>>>>>", value.split(/\n\n/g) )
          console.log(`${key.replace("__EMPTY_", "")}: ${value.replace(/\n\n/g, " | ")}`);
          if (allMaterias.indexOf(value) === -1) {
            if (!value.match(/^\d/)) {
              allMaterias.push(value);
           }
          }
          // if (allMaterias.includes(value) === false) allMaterias.push(value);
        })
        allMatRows.push(rowMats);
      }
      this.setState({allMaterias, allMatRows})
    }
    
    if(this.state.file.size != undefined && this.state.data.length == 0){
      this.handleFile();
    }
  }

  handleFile() {
    /* Boilerplate to set up FileReader */
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
 
    reader.onload = (e) => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA : true });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws);
      /* Update state */
      this.setState({ data: data, cols: make_cols(ws['!ref']) }, () => {
        console.log(JSON.stringify(this.state.data, null, 2));
      });
 
    };
 
    if (rABS) {
      reader.readAsBinaryString(this.state.file);
    } else {
      reader.readAsArrayBuffer(this.state.file);
    };
  }

  render(){
    return(
      <div style={{ 
        display: 'flex',
        alignItems: 'center',
        height: '100vh'}}>

      <div className="container">
      <div className="mb-5" style={{textAlign: 'center',}}>
        <h1>Generador de horarios</h1>
        <p >Esto es una descripcion</p>
      </div>
      {
        this.state.generar ? 
        <>
          <a onClick={this.toggleClick}>X</a>
          <label className="btn btn-primary">
            <i className="fa fa-image"></i> Importar<input type="file" style={{display: 'none'}} accept={SheetJSFT} onChange={this.handleChange}/>
          </label>
          <button>Horarios prestablecidos</button>
          
        <div>
        
        
          {
            this.state.allMaterias && this.state.allMaterias.map((item, i)=>{
              return(
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="check-1"/>
                  <label className="form-check-label" for="check-1">{item}</label>
                </div>
              )
            })
          }
          
        </div>
        <table class="table">
        <thead>
          <tr>
            <th scope="col">Hora</th>
            <th scope="col">Lune</th>
            <th scope="col">M</th>
            <th scope="col">Mi</th>
            <th scope="col">J</th>
            <th scope="col">V</th>
            <th scope="col">S</th>
            <th scope="col">Domingo</th>
          </tr>
        </thead>
        <tbody>
          {
            this.state.allMatRows && this.state.allMatRows.map((item, i)=>{
              return(<>
                <tr>
                  {
                    item.map((subItem, i)=>{
                      if(subItem){
                        let sp = subItem && subItem.split(/\n\n/g);
                        return(<th scope="col">
                        <p style={{fontWeight: 'lighter'}}>{sp[0]}</p>
                        <p style={{fontWeight: 'bold'}}>{sp[1]}</p>
                      </th>)
                      }else{
                        return(<th>
                        <p>Hora libre</p>
                        <p>---</p>
                      </th>)
                      }
                    })
                  }
                </tr>
              </>)
              
            })
          }
          </tbody>
        </table>

          <Link className="bt btn-primary" to={ROUTES.HOME}>Generar</Link>

        </>
    : <Start ctx={this}/>
      }
      
      </div>
    </div>
    )
  }
}
  
const Start = ({ctx}) => {
  return (<>

    <AuthUserContext.Consumer>
      {authUser => (
        <div className="row" style={{textAlign: 'center',}}> 
          <div className="col-6">
            <a onClick={ ctx.toggleClick }  className="card" style={{width: '18rem', marginLeft: 'auto', cursor: 'pointer'}}>
              <img style={{height: 200, objectFit: 'cover'}} className="card-img-top" src="https://www.milenio.com/uploads/media/2019/04/02/el-domingo-de-abril-sera.jpg" alt="Card image cap"/>
              <div className="card-body">
                <h5 className="card-title">Crear Horario</h5>
                <p className="card-text">Selecciona tus materias y crea un horario en minutos.</p>
              </div>
            </a>
          </div>

          <div className="col-6">
            {
              authUser != null ? <Link to={ROUTES.HOME}>
              <div className="card" style={{width: '18rem'}} >
              <img style={{height: 200, objectFit: 'cover'}}  className="card-img-top" src="https://guiauniversitaria.mx/wp-content/uploads/2019/05/dia-del-estudiante-1068x623.jpg" alt="Card image cap"/>
              <div className="card-body">
                <h5 className="card-title">Bienvenido: {authUser.username} </h5>
                <span>Entrar a mi cuenta</span>
                </div>
              </div>
            </Link> :
            <Link className="card" style={{width: '18rem'}} to={ROUTES.SIGN_IN}>
              <img style={{height: 200, objectFit: 'cover'}}  className="card-img-top" src="https://guiauniversitaria.mx/wp-content/uploads/2019/05/dia-del-estudiante-1068x623.jpg" alt="Card image cap"/>
              <div className="card-body">
                <h5 className="card-title">Iniciar sesion</h5>
                <p className="card-text">Guarda tu horario y manten tu lista de tareas al dia.</p>
              </div>
            </Link>

            }
            
          </div>
          <div className="col-12 mt-4">No pasar por aqui si ya tengo un asesion iniciada.</div>
        </div>
      )}
    </AuthUserContext.Consumer>
      
  </>
  )
}

export default (Landing)

