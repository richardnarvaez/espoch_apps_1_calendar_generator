import React from 'react'

class Table extends React.Component{
    constructor(props){
        super(props)
    }
    
    render(){
        const {loading, data, notExist} = this.props
        return(<>
            <div className="spaceUp border-bottom">
                <div>
                    <h2 style={{color:'#3941ca'}}>Lista de Unidades</h2>
                </div>
            </div>
        
            <table className="table table-hover">
                {/* <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Name</th>
                        <th scope="col">N Flota</th>
                        <th scope="col">Placa</th>
                        <th scope="col">Valoración</th>
                    </tr>
                </thead> */}
                {console.log("data table", data)}
                {console.log("length", data.length)}
                <tbody>
                    {
                        ((loading == true) && (notExist == false)) ?
                        data.map((item, i) => {
                            return(
                                <Row callBack={this.props.callBack.bind()}
                                key={i} data={item} loading={loading} id={i}
                                disarmClic={this.props.disarmClic}/>
                            )
                        })
                        :
                        ((loading == false) && (notExist == false)) ?
                        <div className="row justify-content-center">
                            <p>Cargando...</p>
                            <div className="spinner-border text-primary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                        :
                        <div>No existen datos</div>
                    }
                </tbody>
            </table>
        </>)
    }
}

class Row extends React.Component{
    constructor(props){
        super(props)          
    }

    render(){
        const {loading, data, id, disarmClic} = this.props
        {console.log("data", data)}
        {console.log("id", id)}
        return(<>
            <tr onClick={()=> {disarmClic ? alert("Se encuentra editando la informacion de un empleado") :
            this.props.callBack(id)}}>
                {/* <th scope="row">#1</th> */}
                <td className="align-middle center">
                    <img src={loading ? data.urlCar : null}></img>
                </td>
                <td className="align-middle center">
                    <p style={{display: 'inline-block'}}>{loading ? data.estadoCar : "loading..."}</p>
                </td>
                <td className="align-middle center">{loading ? data.placa : "loading..."}</td>
                <td className="align-middle center">{loading ? data.nf : "loading..."}</td>
            </tr>
                
        </>)
    }
}

export default (Table)