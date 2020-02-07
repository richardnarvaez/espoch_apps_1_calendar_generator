import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
class Landing extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      
    }
  }

  componentDidMount(){

  }

  render(){
    return(
      <div>
      <h1>Generador de horarios</h1>

      <Link to={ROUTES.SIGN_IN}>
        <div className="card">
          <span>Generar</span>
        </div>
      </Link>
      
      <div>No pasar por aqui si ya tengo un asesion iniciada.</div>
    </div>
    )
  }
}
  


export default Landing;
