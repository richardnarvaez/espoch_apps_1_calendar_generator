import React, { Component } from 'react';
import Icon from '../../lib/svg';
class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    }
  }

  render() {
    const { title, text, index, removeTodo, checkTodo, checked } = this.props;
    return (
      <div>
        <div className="d-flex justify-content-between" style={{ borderBottom: "solid #e8e8e8 1px", padding: 8, alignItems: "center" }}>
          <div className="row">
            <Icon name={`${checked ? 'check' : 'process'}`} fill={`${checked ? '#28a745' : '#000'}`} />

            {/* className={"btn", `btn-${checked ? 'info' : 'default'}`} */}
            <div style={{ marginLeft: 16 }}>
              <p style={{ fontWeight: 'bold', color: `${checked ? '#28a745' : '#000'}` }}
                onClick={() => checkTodo(text, checked, index)}>
                {title}</p>
              <p>{text ? text : ""}</p>

            </div>

          </div>

          <div>

            <button
              style={{ borderRadius: 1000, background: `${checked ? '#28a745' : '#ccc'}`, height: 35, width: 68, border: 'none' }}
              key={`button-${index}`}
              onClick={() => checkTodo(text, checked, index)}>
              <Icon name="check-simple" fill="#fff" />
            </button>
            <button
              style={{ marginLeft: 8,borderRadius: 1000, background: "#dc3545", height: 35, width: 68, border: 'none' }}
              key={`button-${index}`}
              onClick={() => removeTodo(index)}>
              <Icon name="trash" fill="#fff" />
            </button>
          </div>
        </div>
      </div>
    )
  }

}

export default Todo;
