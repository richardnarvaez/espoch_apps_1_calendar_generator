import React from 'react';
import { withFirebase } from '../Firebase';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { sign } from 'crypto';
import { withRouter } from 'react-router-dom';

//import SignInPage from '../SignIn';

const SignOutButton = ({ firebase, history }) => (
  <>
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
    }}>

      <div className="card" style={{padding: 32}}>
        <h1>Estas seguro de que deseas salir?</h1>
        <div style={{display: "flex"}}>
        <Link to={ROUTES.LANDING}>Cancelar</Link>
        <a
          className="button2"
          style={{ marginLeft: 16, cursor: 'pointer', color: '#2385E8', borderColor: 'white' }}
          onClick={() => {
            firebase.doSignOut();
            history.push('/signin');
          }
          }>
          Cerrar Sesión
    </a></div>
      </div>
    </div>

  </>
);

export default withRouter(withFirebase(SignOutButton));
