import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
class NotFound extends React.Component{
  componentWillMount() {
    // Electron 'bugfix', feels dirty
    if (this.props.location.pathname !== '/') {
      this.props.history.push('/');
    }
  }

  render(){
    return (
      <div>
        <h1>404</h1>
        <p>Esta pagina no esta disponible por el momento</p>
        <Link to={ROUTES.LANDING}>Volver</Link>
      </div>
    )
  }
} 

const condition = authUser => !!authUser;

export default NotFound;
