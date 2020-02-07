import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';

import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

import Icon from '../../lib/svg';

const SignInPage = () => (
  <div>
    {/*
      <h1>SignIn</h1>

    */}    
    <SignInForm />
    {/* <SignInGoogle />
    <SignInFacebook />
    <SignInTwitter />
    <PasswordForgetLink />
    <SignUpLink /> */}
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS =
  'auth/account-exists-with-different-credential';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then((data) => {
        console.log("DAtos de inicio:", data)
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.STADISTIC);
      })
      .catch(error => {
        //this.setState({ error });
        alert("Credenciales incorrectas")
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return ( 
      <>
      <Link to={ROUTES.HOME} className="no-print" style={{
                position: 'fixed',
                background: "#fff",
                padding: 8,
                top: 32,
                left: 32,
                borderRadius: 10000,
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                justifyContent: "center",
                height: 38,
                width: 58,
                boxShadow: "0 2px 5px #00000045",
              }} >
                <Icon className="no-print" name="back" />
              </Link>
      <div className ="text-center" >
        <form className= "form-signin" onSubmit={this.onSubmit}>
          <h1 className="h3 mb-3 font-weight-normal" ><strong> Iniciar Sesión</strong></h1> 
          <div id = 'format'>
            
                <input               
                  className='form-control' 
                  name="email"
                  value={email}
                  onChange={this.onChange}
                  type="email"
                  placeholder="Correo Electrónico"
                />
              
                <input
                  className = 'form-control mt-2'
                  name="password"
                  value={password}
                  onChange={this.onChange}
                  type="password"
                  placeholder="Contraseña"
                />
          </div>   

          <button className="btn  mt-4 btn-lg btn-primary btn-block" id="buton" disabled={isInvalid} type="submit">
          Inciar Sesión
        </button>        
          
          <Link className="btn btn-lg btn-succes" to={ROUTES.SIGN_UP}>Registrarme</Link>  
          
        {error && <p>{error.message}</p>}
        
       </form>
       <p className="mt-5 mb-3 text-muted">&copy; Zetplain</p>
      </div> </>
    );
  }
}

class SignInGoogleBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        return this.props.firebase.admin(socialAuthUser.user.uid).set({
          username: socialAuthUser.user.displayName,
          email: socialAuthUser.user.email,
          roles: {},
        });
      })
      .then(() => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <button type="submit">Sign In with Google</button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

class SignInFacebookBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithFacebook()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        return this.props.firebase.admin(socialAuthUser.user.uid).set({
          username: socialAuthUser.additionalUserInfo.profile.name,
          email: socialAuthUser.additionalUserInfo.profile.email,
          roles: {},
        });
      })
      .then(() => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <button type="submit">Sign In with Facebook</button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

class SignInTwitterBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithTwitter()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        return this.props.firebase.admin(socialAuthUser.user.uid).set({
          username: socialAuthUser.additionalUserInfo.profile.name,
          email: socialAuthUser.additionalUserInfo.profile.email,
          roles: {},
        });
      })
      .then(() => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <button type="submit"></button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

const SignInGoogle = compose(
  withRouter,
  withFirebase,
)(SignInGoogleBase);

const SignInFacebook = compose(
  withRouter,
  withFirebase,
)(SignInFacebookBase);

const SignInTwitter = compose(
  withRouter,
  withFirebase,
)(SignInTwitterBase);

export default SignInPage;
export { SignInForm, SignInGoogle, SignInFacebook, SignInTwitter }