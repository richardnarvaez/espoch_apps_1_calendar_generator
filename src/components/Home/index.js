import React from 'react';
import { compose } from 'recompose';

import  { withFirebase } from '../Firebase';
import { withAuthorization, withEmailVerification } from '../Session';
import Messages from '../Messages';
import Todo from '../Todo';

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {counter: 10, todos: [], inputValue: ''};

    this.addCounter = this.addCounter.bind(this);
    this.subtractCounter = this.subtractCounter.bind(this);

    
  }

  componentDidMount() {
    this.rootRef =  this.props.firebase.db.ref();//firebase.database().ref();
    // this.counterRef = this.rootRef.child('counter');
    this.todosRef = this.rootRef.child('todos')

    this.rootRef.on('value', snap => {
      this.setState({counter: snap.child('counter').val()});
      this.setState({todos: snap.child('todos').val() || []});
    });
  }

  // addCounter() {
  //   this.counterRef.set(this.state.counter + 1);
  // }

  subtractCounter() {
    this.counterRef.set(this.state.counter - 1);
  }

  addTodo(val) {
    const todo = {text: val, checked: false}
    this.state.todos.push(todo);
    this.rootRef.set({todos: this.state.todos, counter: this.state.counter});
    this.setState({inputValue: ''});
  }

  checkTodo(text, checked, i) {
    this.todosRef.child(i).set({text: text, checked: !checked});
    this.state.todos.map((todo) => {
      if(i !== this.state.todos.indexOf(todo)) return todo.checked = true;
    });
  }

  removeTodo(i) {
    const remainder = this.state.todos.filter((todo) => {
      if(i !== this.state.todos.indexOf(todo)) return todo;
    });
    this.rootRef.set({todos: remainder, counter: this.state.counter});
  }

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  handleKeyPress(e) {
    if(e.key == 'Enter'){
      this.addTodo(this.state.inputValue);
    }
  }

  render(){

    const todoList = this.state.todos.map((todo, i) => (
      <Todo key={i} index={i} text={todo.text} checked={todo.checked} checkTodo={this.checkTodo.bind(this)} removeTodo={this.removeTodo.bind(this)} />
    ))

    return (
    <div>
        <h1>Home Page</h1>
        <p>The Home Page is accessible by every signed in user.</p>

        <Messages />

        <div className="App container">
        

        <div className="row">
          <div className="form-inline todoInput">
            <input
              className='form-control'
              value={this.state.inputValue}
              onKeyPress={e => this.handleKeyPress(e)}
              onChange={evt => this.updateInputValue(evt)}/>
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
