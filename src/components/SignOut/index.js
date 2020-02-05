import React from 'react';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { sign } from 'crypto';
import { withRouter } from 'react-router-dom';

//import SignInPage from '../SignIn';

const SignOutButton = ({ firebase, history }) => (
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
);

export default  withRouter(withFirebase(SignOutButton));
