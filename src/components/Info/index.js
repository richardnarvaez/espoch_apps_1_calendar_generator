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
                            <h3 style={{marginLeft: 16, marginBottom: 0}}>Info</h3>
                        </div>
                        <div id="list-example" class="list-group mt-4">
                            <a class="list-group-item list-group-item-action" href="#list-item-1">Item 1</a>
                            <a class="list-group-item list-group-item-action" href="#list-item-2">Item 2</a>
                            <a class="list-group-item list-group-item-action" href="#list-item-3">Item 3</a>
                            <a class="list-group-item list-group-item-action" href="#list-item-4">Item 4</a>
                        </div>
                    </div>

                    <div className="col-9" style={{ padding: 32 }}>
                        <div>
                            <h1>Zetplain</h1>
                            <p className="mb-4">Manual de usuario e informacion</p>
                            <h4 id="list-item-1">Item 1</h4>
                            <p>
                                .sdasdasdasdasd
                                sdasdasdasdl;jasdlkfa;sdf
                                dsdlfksd;fsjd;sdfdfhola como ehola como estas como estasd comhola comoae
                                sdasdasdasdasd
                                sdasdasdasdl;jasdlkfa;sdf
                                dsdlfksd;fsjd;sdfdfhola como ehola como estas como estasd comhola comoae
                                sdasdasdasdasd
                                sdasdasdasdl;jasdlkfa;sdf
                                dsdlfksd;fsjd;sdfdfhola como ehola como estas como estasd comhola comoae
                            </p>
                            <h4 id="list-item-1">Item 1</h4>
                            <p>
                                .sdasdasdasdasd
                                sdasdasdasdl;jasdlkfa;sdf
                                dsdlfksd;fsjd;sdfdfhola como ehola como estas como estasd comhola comoae
                                sdasdasdasdasd
                                sdasdasdasdl;jasdlkfa;sdf
                                dsdlfksd;fsjd;sdfdfhola como ehola como estas como estasd comhola comoae
                                sdasdasdasdasd
                                sdasdasdasdl;jasdlkfa;sdf
                                dsdlfksd;fsjd;sdfdfhola como ehola como estas como estasd comhola comoae
                            </p>
                            <h4 id="list-item-1">Item 1</h4>
                            <p>
                                .sdasdasdasdasd
                                sdasdasdasdl;jasdlkfa;sdf
                                dsdlfksd;fsjd;sdfdfhola como ehola como estas como estasd comhola comoae
                                sdasdasdasdasd
                                sdasdasdasdl;jasdlkfa;sdf
                                dsdlfksd;fsjd;sdfdfhola como ehola como estas como estasd comhola comoae
                                sdasdasdasdasd
                                sdasdasdasdl;jasdlkfa;sdf
                                dsdlfksd;fsjd;sdfdfhola como ehola como estas como estasd comhola comoae
                            </p>
                            <h4 id="list-item-1">Item 1</h4>
                            <p>
                                .sdasdasdasdasd
                                sdasdasdasdl;jasdlkfa;sdf
                                dsdlfksd;fsjd;sdfdfhola como ehola como estas como estasd comhola comoae
                                sdasdasdasdasd
                                sdasdasdasdl;jasdlkfa;sdf
                                dsdlfksd;fsjd;sdfdfhola como ehola como estas como estasd comhola comoae
                                sdasdasdasdasd
                                sdasdasdasdl;jasdlkfa;sdf
                                dsdlfksd;fsjd;sdfdfhola como ehola como estas como estasd comhola comoae
                            </p>
                            <h4 id="list-item-1">Item 1</h4>
                            <p>
                                .sdasdasdasdasd
                                sdasdasdasdl;jasdlkfa;sdf
                                dsdlfksd;fsjd;sdfdfhola como ehola como estas como estasd comhola comoae
                                sdasdasdasdasd
                                sdasdasdasdl;jasdlkfa;sdf
                                dsdlfksd;fsjd;sdfdfhola como ehola como estas como estasd comhola comoae
                                sdasdasdasdasd
                                sdasdasdasdl;jasdlkfa;sdf
                                dsdlfksd;fsjd;sdfdfhola como ehola como estas como estasd comhola comoae
                            </p>
                            <h4 id="list-item-1">Item 1</h4>
                            <p>
                                .sdasdasdasdasd
                                sdasdasdasdl;jasdlkfa;sdf
                                dsdlfksd;fsjd;sdfdfhola como ehola como estas como estasd comhola comoae
                                sdasdasdasdasd
                                sdasdasdasdl;jasdlkfa;sdf
                                dsdlfksd;fsjd;sdfdfhola como ehola como estas como estasd comhola comoae
                                sdasdasdasdasd
                                sdasdasdasdl;jasdlkfa;sdf
                                dsdlfksd;fsjd;sdfdfhola como ehola como estas como estasd comhola comoae
                            </p>
                            <h4 id="list-item-1">Item 1</h4>
                            <p>
                                .sdasdasdasdasd
                                sdasdasdasdl;jasdlkfa;sdf
                                dsdlfksd;fsjd;sdfdfhola como ehola como estas como estasd comhola comoae
                                sdasdasdasdasd
                                sdasdasdasdl;jasdlkfa;sdf
                                dsdlfksd;fsjd;sdfdfhola como ehola como estas como estasd comhola comoae
                                sdasdasdasdasd
                                sdasdasdasdl;jasdlkfa;sdf
                                dsdlfksd;fsjd;sdfdfhola como ehola como estas como estasd comhola comoae
                            </p>
                            <h4 id="list-item-2">Item 2</h4>
                            <p>
                                .sdasdasdasdasd
                                    sdasdasdasdl;jasdlkfa;sdf
                                    dsdlfksd;fsjd;sdfdfhola como ehola como estas como estasd comhola comoae
                                    sdasdasdasdasd
                                    sdasdasdasdl;jasdlkfa;sdf
                                    dsdlfksd;fsjd;sdfdfhola como ehola como estas como estasd comhola comoae
                                    sdasdasdasdasd
                                    sdasdasdasdl;jasdlkfa;sdf
                                    dsdlfksd;fsjd;sdfdfhola como ehola como estas como estasd comhola comoae
                            </p>
                            <h4 id="list-item-3">Item 3</h4>
                            <p>
                                .sdasdasdasdasd
                                    sdasdasdasdl;jasdlkfa;sdf
                                    dsdlfksd;fsjd;sdfdfhola como ehola como estas como estasd comhola comoae
                                    sdasdasdasdasd
                                    sdasdasdasdl;jasdlkfa;sdf
                                    dsdlfksd;fsjd;sdfdfhola como ehola como estas como estasd comhola comoae
                                    sdasdasdasdasd
                                    sdasdasdasdl;jasdlkfa;sdf
                                    dsdlfksd;fsjd;sdfdfhola como ehola como estas como estasd comhola comoae
                            </p>
                            <h4 id="list-item-4">Item 4</h4>
                            <p>.sdasdasdasdasd
                                sdasdasdasdl;jasdlkfa;sdf
                                dsdlfksd;fsjd;sdfdfhola como ehola como estas como estasd comhola comoae
                                sdasdasdasdasd
                                sdasdasdasdl;jasdlkfa;sdf
                                dsdlfksd;fsjd;sdfdfhola como ehola como estas como estasd comhola comoae
                                sdasdasdasdasd
                                sdasdasdasdl;jasdlkfa;sdf
                                dsdlfksd;fsjd;sdfdfhola como ehola como estas como estasd comhola comoae</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
