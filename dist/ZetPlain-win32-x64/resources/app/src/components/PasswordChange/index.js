import React, { Component } from 'react';

import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { passwordOne } = this.state;

    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        alert.React("Cambio de contraseña exitoso");
      })
      .catch(error => {
        //this.setState({ error });
        alert("Error en cambio de contraseña");
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';

    return (
      <form className="formNew" onSubmit={this.onSubmit}>
        <div id = 'format'>
          <label for="inputPassword" class="sr-only">Password</label>
          <input
            className = 'form-control'
            id = "inputCount"
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
            type="password"
            placeholder="Contraseña"
          />
          <label for="inputPassword" class="sr-only">Password</label>   
          <input
            className = 'form-control'
            id = "inputCount"
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
            type="password"
            placeholder="confirma tu contraseña"
          />
          <button className="btn btn-lg btn-primary btn-block" id= "butonChange" disabled={isInvalid} type="submit">
            Cambiar contraseña
          </button>
        </div>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default withFirebase(PasswordChangeForm);
