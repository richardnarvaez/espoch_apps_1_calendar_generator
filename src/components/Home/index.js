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
    this.state = { counter: 10, user: "", todos: [], inputValue: '', loading: true, edit: false };

    // this.addCounter = this.addCounter.bind(this);
    this.subtractCounter = this.subtractCounter.bind(this);


  }

  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged(authUser => {
      this.rootRef = this.props.firebase.db.ref();//firebase.database().ref();
      // this.counterRef = this.rootRef.child('counter');
      console.log("FIREBASE: ", authUser)
      this.setState({user: authUser})
      const id = authUser.uid
      this.todosRef = this.rootRef.child('users/' + id + '/todos')
      this.todosUserRef = this.rootRef.child('users/' + id)
      this.rootRef.on('value', snap => {
        this.setState({ counter: snap.child('counter').val() });
        this.setState({ todos: snap.child('users/' + id + '/todos').val() || [] });
      });
      this.rootRef.child('users/' + id + '/horario').on('value', snap=>{
          this.setState({allMatRows: snap.val(), loading: false})

      })
    })

  }

  // addCounter() {
  //   this.counterRef.set(this.state.counter + 1);
  // }

  subtractCounter() {
    this.counterRef.set(this.state.counter - 1);
  }

  addTodo(valT, val) {
    const todo = { title: valT, text: val, checked: false }
    this.state.todos.push(todo);
    this.todosUserRef.update({ todos: this.state.todos, counter: this.state.counter });
    this.setState({ inputValue: '' });
  }

  checkTodo(text, checked, i) {
    this.todosRef.child(i).update({ text: text, checked: !checked });
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

  updateInputValueTitle(evt) {
    this.setState({
      inputValueTitle:  evt.target.value
    });
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

  editHorario(){
    this.setState({edit: !this.state.edit})
  }

  guardarHorario(){
    this.setState({edit: false})

    var tableInfo = Array.prototype.map.call(document.querySelectorAll('#horario tr'), function (tr) {
      if (tr.querySelectorAll('th input').length > 0)
        return Array.prototype.map.call(tr.querySelectorAll('th input'), function (td) {
          return td.value;
        });
    });
    tableInfo.shift();

    console.log("HORARIO:", tableInfo)
    try{
      const uid = this.props.firebase.auth.currentUser.uid
      if(tableInfo.length != 0){
        if(uid != null){
          this.props.firebase.user(uid).update({horario: tableInfo})
          this.props.history.push(ROUTES.HOME);
        }else{
          alert("Parece que no tienes una USUARIO, por lo que no puedes generar un horario. Tienes la opcion de IMPRIMIR sin registrarte")
        }
      }else{
        alert("No hay datos, Importa un horario")
      }
    }catch{
      alert("Parece que no tienes una USUARIO, por lo que no puedes generar un horario. Tienes la opcion de IMPRIMIR sin registrarte")
    }
  }

  render() {

    const todoList = this.state.todos.map((todo, i) => (
      <Todo key={i} index={i} title={todo.title} text={todo.text} checked={todo.checked} checkTodo={this.checkTodo.bind(this)} removeTodo={this.removeTodo.bind(this)} />
    ))

    return (
      <>
      <Link className="no-print" style={{
            position: 'fixed',
            top: 32,
            left: 32,
          background: "#fff",
          padding: 8,
          borderRadius: 10000,
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          justifyContent: "center",
          height: 38,
          width: 58,
          boxShadow: "0 2px 5px #00000045",
          }} to={ROUTES.LANDING}>
            <Icon className="no-print" name="back"/>
          </Link>
      <div className="container">
        <div class="row justify-content-between" style={{ marginTop: 32 }}>
          <div class="col-6">
            {/* <h1>Home</h1> */}
          </div>
          <div class="col-6" style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "flex-end"
          }}>
            <div class="dropdown">
              <a style={{
                borderRadius: 1000, background: "#efecec", display: "flex", padding: 4,
                alignItems: "center"
              }} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img style={{ width: 32, height: 32 }} src="https://images.vexels.com/media/users/3/147101/isolated/preview/b4a49d4b864c74bb73de63f080ad7930-instagram-profile-button-by-vexels.png" />
                <p style={{ marginLeft: 8, marginRight: 8, maxWidth: 100,
                    overflow: "hidden"}}>{this.state.user && this.state.user.email}</p>
              </a>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <Link to={ROUTES.INFO} class="dropdown-item" href="#">Informacion</Link>
                <Link to={ROUTES.SIGN_OUT} class="dropdown-item" href="#">Cerrar Sesion</Link>
              </div>
            </div>
          </div>
        </div>




        {/* <Messages /> */}

        <div className="App container">

          <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Añadir nueva tarea</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">

                <div className="row">

            <input
                placeholder="Titulo"
                className='form-control'
                value={this.state.inputValueTitle}
                // onKeyPress={e => this.handleKeyPress(e)}
                onChange={evt => this.updateInputValueTitle(evt)} />
              <input
                placeholder="Descripcion"
                className='form-control mt-3'
                value={this.state.inputValue}
                // onKeyPress={e => this.handleKeyPress(e)}
                onChange={evt => this.updateInputValue(evt)} />
      
          </div>


                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                  <button type="button" data-dismiss="modal" class={`btn btn-${this.state.inputValueTitle ? 'success' : 'default'}`} 
                  disabled={!this.state.inputValueTitle} 
                  onClick={() => this.addTodo(this.state.inputValueTitle, this.state.inputValue)}>Guardar</button>
                </div>
              </div>
            </div>
          </div>

          <button
            type="button" data-toggle="modal" data-target="#exampleModal"
            style={{ border: "none", fontWeight: "bold", position: "fixed", bottom: 32, right: 32, padding: "16px 32px", borderRadius: 1000, background: "#1e2786", color: "#fff", boxShadow: "0 2px 5px #00000035" }}
            className={'btn', `btn-${this.state.inputValue ? 'success' : 'default'}`}>Nueva tarea</button>

          <div className="d-flex justify-content-between align-items-center">
          <div className="mb-3">
            <h3>Horario</h3>
            <p>Personaliza tu horario</p>
          </div>
          <div>
            <button
              style={{ borderRadius: 1000, fontWeight: 'bold', paddingLeft:16, paddingRight:16, color: '#1e2786', boxShadow: '0 2px 5px #00000015', background: '#fff', height: 35, border: 'none' }}
              onClick={() => this.editHorario()}>
              {/* <Icon name="check-simple" fill="" /> */}
              {this.state.edit ?"Cancelar" : "Editar" } 
            </button>
            {
              this.state.edit ? <button
              style={{ borderRadius: 1000,fontWeight: 'bold',paddingLeft:16, paddingRight:16, marginLeft: 16,boxShadow: '0 2px 5px #00000015', color: "#fff", background: '#28a745', height: 35, border: 'none' }}
              onClick={() => this.guardarHorario()}>
              Guardar
            </button> : null
            }
            
            {/* `${checked ? '#28a745' : '#ccc'}` */}
          </div>
</div>
              <table id="horario" className="table mt-3" style={{
                  borderRadius: 16,
                  background: '#fafafa',
                  boxShadow: '0 2px 5px #00000015',
                  overflow: "hidden"
                }}>
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Hora</th>
                      <th scope="col">Lunes</th>
                      <th scope="col">Martes</th>
                      <th scope="col">Miercoles</th>
                      <th scope="col">Jueves</th>
                      <th scope="col">Viernes</th>
                      <th scope="col">Sabado</th>
                      <th scope="col">Domingo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.allMatRows && this.state.allMatRows.map((item, i) => {
                        return (<>
                          <tr>
                            {
                              item.map((subItem, i) => {
                                if(!this.state.edit){
                                if (subItem != "") {
                                  return (<th scope="col">
                                    <p style={{ fontWeight: 'bold', fontSize: 12 }}>{subItem}</p>
                                  </th>)
                                } else {
                                  return (<th>
                                    <p style={{ fontWeight: 'bold', fontSize: 8 }}>--</p>
                                  </th>)
                                }

                                }else{
                                  if (subItem) {
                                    let sp = subItem && subItem.split(/\n\n/g);
                                    return (<th scope="col">
                                      <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping" value={sp[0]} />
                                      {/* <p style={{fontWeight: 'lighter',fontSize: 13}}>{sp[0]}</p> */}
                                      <p style={{ fontWeight: 'bold', fontSize: 8 }}>{sp[1]}</p>
                                    </th>)
                                  } else {
                                    return (<th>
                                      <input type="text" class="form-control" placeholder="Libre" aria-label="Username" aria-describedby="addon-wrapping" />
                                    </th>)
                                  }
                                }
                                
                              })
                            }
                          </tr>
                        </>)

                      })
                    }
                  </tbody>
                </table>

            <div>
            <h3>Lista</h3>
            <p>Anota tus tareas y cumplelas de forma ordenada</p>
          </div>
          <div className="mt-4 " style={{marginBottom: 150}}>
            {todoList}
          </div>
        </div>

      </div></>
    )
  }
}
const condition = authUser => !!authUser;

export default
  // compose(
  // withEmailVerification,
  // withAuthorization(condition),)
  withFirebase(HomePage);
