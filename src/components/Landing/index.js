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
      for(let i = 7; i<= this.state.data.length - 1; i ++){
        console.log("I: ", i)
        console.log("DATOS FIJOS: ", this.state.data[i])

        Object.keys(this.state.data[i]).forEach(key => {
          let value = this.state.data[i][key];
          console.log(`${key.replace("__EMPTY_", "")}: ${value}`);
          if (allMaterias.indexOf(value) === -1) {
            if (!value.match(/^\d/)) {
              allMaterias.push(value);
           }
          }
          // if (allMaterias.includes(value) === false) allMaterias.push(value);
        })
      }
      console.log("allMaterias:", allMaterias)
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
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="check-1"/>
          <label className="form-check-label" for="check-1">Mate I</label>
          </div>
          <div className="form-check">
          <input className="form-check-input" type="checkbox" id="check-2"/>
          <label className="form-check-label" for="check-2">Fisica II</label>
          </div>
          <div className="form-check">
          <input className="form-check-input" type="checkbox" id="check-3"/>
          <label className="form-check-label" for="check-3">Discretas</label>
          </div>
        </div>

          <Link to={ROUTES.HOME}>
            <div>
              <span>Generar</span>
            </div>
          </Link>
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
              <div className="card">
                <span>Nombre: {authUser.username} </span>
                <span>Entrar a mi cuenta</span>
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

