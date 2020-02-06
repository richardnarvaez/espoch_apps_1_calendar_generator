import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import Icon from '../../lib/svg';
export default class Info extends Component {
    render() {
        return (
            <div style={{ height: '100vh' }}>

                <div className="row">
                    <div className="col-3"></div>
                    <div className="col-3" style={{ position: 'fixed', paddingTop: 32 }}>
                        <div style={{
                            display: 'flex',
                            alignItems: "center"
                        }}>
                            <Link className="no-print" style={{
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
                            }} to={ROUTES.HOME}>
                                <Icon className="no-print" name="back" />
                            </Link>
                            <h3 style={{ marginLeft: 16, marginBottom: 0 }}>Info</h3>
                        </div>
                        <div id="list-example" class="list-group mt-4">
                            <a class="list-group-item list-group-item-action" href="#list-item-1">1.Introducción</a>
                            <a class="list-group-item list-group-item-action" href="#list-item-2">2.Primeros Pasos</a>
                            <a class="list-group-item list-group-item-action" href="#list-item-3">3.Crear Horario</a>
                            <a class="list-group-item list-group-item-action" href="#list-item-4">4.Asignar Actividades</a>
                            <a class="list-group-item list-group-item-action" href="#list-item-5">5.Guardar Horario</a>
                        </div>
                    </div>

                    <div className="col-9" style={{ padding: 32 }}>
                        <div>
                            <h1>Zetplain</h1>
                            <p className="mb-4">Manual de usuario e informacion</p>
                            <h4 id="list-item-1">1.Introducción</h4>
                            <p>
                                Zetplain es un programa que te permite crear tu propio horario academico
                                además de darte la capacidad de asignar otras actividades que puedes incluir
                                dentro de tu horario.
                            </p>
                            <h4 id="list-item-1">2.Primeros Pasos</h4>
                            <p>
                                Para comenzar a usar ZETPLAIN primero debes registrarte y logearte en la primera
                                pantalla, luego de eso pasaras a la panatlla prinicpal que te mostrará todas las
                                herramientas para elaborar tu horario
                            </p>
                            <h4 id="list-item-1">3.Crear Horario</h4>
                            <p>
                                Al pulsar el boton (no se como se llama) te llevara a una nueva ventana en la cual
                                deberás escoger las materias a cursar ese semestre y automaticamente se genera un
                                horario con tiempos de almuerzo y descanso.
                            </p>
                            <h4 id="list-item-1">4.Asignar Actividades</h4>
                            <p>
                                Para asginar una actividad primero debes hacer clic en cualquier recuadro vacio del
                                horario, al pularlo podras ingresar la actvidad que vas a realizar en esa hora específica.
                            </p>
                            <h4 id="list-item-1">5.Guardar Horario</h4>
                            <p>
                                Para guardar el horario simplemente tienes que hacer clic en el boton GUARDAR y escoger
                                la ruta de ubicacion de tu preferencia. 
                            </p>
                            </div>
                    </div>
                </div>
            </div>
        )
    }
}
