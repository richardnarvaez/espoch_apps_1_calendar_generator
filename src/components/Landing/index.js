import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import Icon from '../../lib/svg';

import XLSX from 'xlsx';
import { make_cols } from './../../MakeColumns';
import { SheetJSFT } from './../../types';

import { compose } from 'recompose';
import Calendar from 'tui-calendar'; /* ES6 */
import "tui-calendar/dist/tui-calendar.css";
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';

import {
  AuthUserContext,
  // withAuthorization,
  // withEmailVerification,
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
    
//     calendar.createSchedules([
//       {
//           id: '1',
//           calendarId: '1',
//           title: 'my schedule',
//           category: 'time',
//           dueDateClass: '',
//           start: '2020-02-05T08:30:00+05:00',
//           end: '2020-02-05T09:30:00+05:00'
//       },
      
//   ]);
//     calendar.on('clickMore', function(event) {
//       console.log('clickMore', event.date, event.target);
//   });
//   calendar.on('beforeUpdateSchedule', function(event) {
//     var schedule = event.schedule;
//     var changes = event.changes;

//     calendar.updateSchedule(schedule.id, schedule.calendarId, changes);
// });

// calendar.on('beforeCreateSchedule', function(event) {
//   var startTime = event.start;
//   var endTime = event.end;
//   var isAllDay = event.isAllDay;
//   var guide = event.guide;
//   var triggerEventName = event.triggerEventName;
//   var schedule;

//   if (triggerEventName === 'click') {
//       // open writing simple schedule popup
//       schedule = {...};
//   } else if (triggerEventName === 'dblclick') {
//       // open writing detail schedule popup
//       schedule = {...};
//   }

//   calendar.createSchedules([schedule]);
// });
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
        // console.log("DATA: ", this.state.data.length)
      let allMaterias = [];
      let allMatRows = [];
      for(let i=0; i<= 6; i++){
        allMatRows.push([null, null, null, null, null, null, null, null])
      }
      for(let i = 7; i<= this.state.data.length - 1; i ++){
        
        // console.log("I: ", i)
        // console.log("SSSSS: ", this.state.data[i]["__EMPTY_1"].split(":")[0])
        const vls = this.state.data[i]["__EMPTY_1"].split(":")[0];
        // console.log("DATOS FIJOS: ", this.state.data[i])

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
          if (allMaterias.indexOf(value.split(/\n\n/g)[0]) === -1) {
            if (!value.match(/^\d/)) {
              allMaterias.push(value.split(/\n\n/g)[0]);
           }
          }
          // if (allMaterias.includes(value) === false) allMaterias.push(value);
        })

        switch(vls){
          case "7":
            allMatRows[0] = rowMats;
            break
          case "9":
            allMatRows[1] = rowMats;
            break
          case "11":
            allMatRows[2] = rowMats;
            break
          case "13":
            allMatRows[3] = rowMats;
            break
          case "15":
            allMatRows[4] = rowMats;
            break
          case "19":
            allMatRows[5] = rowMats;
            break
          case "21":
            allMatRows[6] = rowMats;
            break
        }
        
        
      }
      console.log(">>>>>>>", allMatRows)
      this.setState({allMaterias, allMatRows})
      let daynames = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"]
    // var calendar = new Calendar('#calendar', {
    //   defaultView: 'week',
    //   useCreationPopup: true,
    // useDetailPopup: true,
    // day:{},
    //   week: {
    //     daynames: daynames,
    //     narrowWeekend: true,
    //     startDayOfWeek: 1 // monday
    //   },
    //   taskView: false,
    //   template: {
    //     monthDayname: function(dayname) {
    //       return '<span class="calendar-week-dayname-name">' + dayname.label + '</span>';
    //     }
    //   }
    // });
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

  generar=()=>{
    var tableInfo = Array.prototype.map.call(document.querySelectorAll('#horario tr'), function(tr){
      if(tr.querySelectorAll('th input').length >0)
      return Array.prototype.map.call(tr.querySelectorAll('th input'), function(td){
        return td.value;
        });
      });
      tableInfo.shift();
    console.log("HORARIO:", tableInfo)
  }
  render(){
    return(
      <div style={{ 
        display: 'flex',
        alignItems: 'center',
        height: '100vh'}}>

      <div className="container">
      
      {
        this.state.generar ? 
        <>

        <a className="no-print" style={{position: 'absolute',
          background: "#fff",
          padding: 8,
          borderRadius: 10000,
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          justifyContent: "center",
          height: 42,
          width: 42,
          boxShadow: "0 2px 5px #00000045",
          }} onClick={this.toggleClick}>
            <Icon name="back"/>
          </a>

        <div className="mb-5 no-print" style={{textAlign: 'center',}}>
          <h1>Generador de horarios</h1>
          <p >Esto es una descripcion</p>
        </div>
      
        <div className="no-print">

          <label className="btn btn-primary">
            <i className="fa fa-image"></i> Importar<input type="file" style={{display: 'none'}} accept={SheetJSFT} onChange={this.handleChange}/>
          </label>
          <button>Horarios prestablecidos</button>
          
        </div>
        <div>
        
        
          {/* {
            this.state.allMaterias && this.state.allMaterias.map((item, i)=>{
              return(
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="check-1"/>
                  <label className="form-check-label" for="check-1">{item}</label>
                </div>
              )
            })
          } */}
          
        </div>
        <table id="horario" class="table">
        <thead>
          <tr>
            <th scope="col">Hora</th>
            <th scope="col">Lunes</th>
            <th scope="col">Martes</th>
            <th scope="col">Miercoles</th>
            <th scope="col">Jueves</th>
            <th scope="col">Viernes</th>
            <th scope="col">Sabado</th>
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
                        <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping" value={sp[0]}/>
                        {/* <p style={{fontWeight: 'lighter',fontSize: 13}}>{sp[0]}</p> */}
                        <p style={{fontWeight: 'bold', fontSize: 8}}>{sp[1]}</p>
                      </th>)
                      }else{
                        return(<th>
                          <input type="text" class="form-control" placeholder="Libre" aria-label="Username" aria-describedby="addon-wrapping"/>
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

        <div id="calendar"></div>

          <div className="no-print">
            <button className="bt btn-primary" onClick={this.generar}>Generar</button>
            <button onClick={()=>window.print()}>Imprimir</button>
          </div>

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

