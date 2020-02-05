import React, { Component } from 'react';

class Todo extends Component {
  constructor(props){
    super(props);
    this.state = {
      checked: false
    }
  }

  render(){
    const {text, index, removeTodo, checkTodo, checked} = this.props;
    return(
      <div className="">
        <div className="row">
          <label
            className={"btn", `btn-${checked ? 'info' : 'default'}`}
            onClick={() => checkTodo(text, checked, index)}>
            {text}
          </label>
          <button
            className="btn btn-danger"
            key={`button-${index}`}
            onClick={() => removeTodo(index)}>-</button>
        </div>
      </div>
    )
  }

}

export default Todo;
