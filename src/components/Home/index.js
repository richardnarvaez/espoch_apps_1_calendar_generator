import React from 'react';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import Icon from '../../lib/svg';

import { withFirebase } from '../Firebase';
import { withAuthorization, withEmailVerification } from '../Session';
import Messages from '../Messages';
import Todo from '../Todo';

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = { counter: 10, todos: [], inputValue: '' };

    // this.addCounter = this.addCounter.bind(this);
    this.subtractCounter = this.subtractCounter.bind(this);


  }

  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged(authUser => {
      this.rootRef = this.props.firebase.db.ref();//firebase.database().ref();
      // this.counterRef = this.rootRef.child('counter');
      console.log("FIREBASE: ", authUser)
      const id = authUser.uid
      this.todosRef = this.rootRef.child('users/' + id + '/todos')
      this.todosUserRef = this.rootRef.child('users/' + id)
      this.rootRef.on('value', snap => {
        this.setState({ counter: snap.child('counter').val() });
        this.setState({ todos: snap.child('users/' + id + '/todos').val() || [] });
      });
    })

  }

  // addCounter() {
  //   this.counterRef.set(this.state.counter + 1);
  // }

  subtractCounter() {
    this.counterRef.set(this.state.counter - 1);
  }

  addTodo(val) {
    const todo = { text: val, checked: false }
    this.state.todos.push(todo);
    this.todosUserRef.update({ todos: this.state.todos, counter: this.state.counter });
    this.setState({ inputValue: '' });
  }

  checkTodo(text, checked, i) {
    this.todosRef.child(i).set({ text: text, checked: !checked });
    this.state.todos.map((todo) => {
      if (i !== this.state.todos.indexOf(todo)) return todo.checked = true;
    });
  }

  removeTodo(i) {
    const remainder = this.state.todos.filter((todo) => {
      if (i !== this.state.todos.indexOf(todo)) return todo;
    })
    this.todosUserRef.update({ todos: remainder, counter: this.state.counter });
  }

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  handleKeyPress(e) {
    if (e.key == 'Enter') {
      this.addTodo(this.state.inputValue);
    }
  }

  render() {

    const todoList = this.state.todos.map((todo, i) => (
      <Todo key={i} index={i} text={todo.text} checked={todo.checked} checkTodo={this.checkTodo.bind(this)} removeTodo={this.removeTodo.bind(this)} />
    ))

    return (
      <div className="container">
        <div class="row justify-content-between" style={{ marginTop: 32 }}>
          <div class="col-6">
            <h1>Lista</h1>
            <p>Anota tus tareas y cumplelas de forma ordenada</p>
          </div>
          <div class="col-2" style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center"
          }}>
            <div class="dropdown">
              <button type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img style={{ width: 32, height: 32 }} src="https://images.vexels.com/media/users/3/147101/isolated/preview/b4a49d4b864c74bb73de63f080ad7930-instagram-profile-button-by-vexels.png" />
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <Link to={ROUTES.INFO} class="dropdown-item" href="#">Informacion</Link>
                <Link to={ROUTES.SIGN_OUT} class="dropdown-item" href="#">Cerrar Sesion</Link>
              </div>
            </div>
          </div>
        </div>




        {/* <Messages /> */}

        <div className="App container">


          <div className="row">
            <div className="form-inline todoInput">
              <input
                className='form-control'
                value={this.state.inputValue}
                onKeyPress={e => this.handleKeyPress(e)}
                onChange={evt => this.updateInputValue(evt)} />
              <button
                className={'btn', `btn-${this.state.inputValue ? 'success' : 'default'}`}
                onClick={() => this.addTodo(this.state.inputValue)}
                disabled={!this.state.inputValue}>
                Add
            </button>
            </div>
          </div>
          <div>
            {todoList}
          </div>
        </div>

      </div>
    )
  }
}
const condition = authUser => !!authUser;

export default
  // compose(
  // withEmailVerification,
  // withAuthorization(condition),)
  withFirebase(HomePage);
