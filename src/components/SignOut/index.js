import React from 'react';
import { withFirebase } from '../Firebase';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { sign } from 'crypto';
import { withRouter } from 'react-router-dom';

//import SignInPage from '../SignIn';

const SignOutButton = ({ firebase, history }) => (
  <>
  <h1>Estas seguro de que deseas salir?</h1>
  <Link to={ROUTES.LANDING}>VOLVER</Link>
  <button
      className="button2"
    style={{ color: '#2385E8', borderColor: 'white' }}
      onClick={() => {
        firebase.doSignOut();
      //this.props.history.push(ROUTES.SIGN_IN)       
      //<Route path={ROUTES.SIGN_IN} component={SignInPage}/>  
      history.push('/signin');
    }
    }>      
       Salir        
  </button>
  </>
);

export default  withRouter(withFirebase(SignOutButton));
