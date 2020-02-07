import React from 'react'
import Star from "../FlotaComp/progressStar"

class Table extends React.Component{
    constructor(props){
        super(props)
        this.state={
           /* data: [
                {title: 'Panda uwu', "description": 'pandita', 
                url: 'https://www.elheraldo.co/sites/default/files/articulo/2017/07/18/ss-160826-twip-05-8cf6d4cb83758449fd400c7c3d71aa1f.jpg'},
                {title: 'Perrito :3', "description": 'cosita hermosa',
                url: 'https://www.tuenlinea.com/wp-content/uploads/2018/08/%C2%BFTe-has-preguntado-que-sue%C3%B1a-tu-perrito.jpg'},
                {title: 'Gatito', "description": 'el bicho jsjs',
                url: 'https://www.hola.com/imagenes/estar-bien/20180831128704/ronroneo-gatos-causas/0-595-638/gato-ronroneo-1-m.jpg?filter=w500&filter=ds75'},
                {title: 'Piñas', "description": 'pedasito de cielo',
                url: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Construcci%C3%B3n_de_pasamano%2C_rampa_e_iluminaci%C3%B3n_de_los_exteriores_en_la_Iglesia_Matriz_de_Pi%C3%B1as_%2810962576363%29.jpg'}
            ],*/
        }
    }
    
    render(){
        const {loading, data, notExist} = this.props
        return(<>
            <div className="spaceUp border-bottom">
                <div>
                    <h2 style={{color:'#3941ca'}}>Lista de Empleados</h2>
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
                    <img src={loading ? data.urlEmpleado : null}></img>
                </td>
                <td className="align-middle center">
                    <p style={{display: 'inline-block'}}>{loading ? data.firstName : "loading..."}</p>
                </td>
                <td className="align-middle center">{loading ? (data.idFlota != null ? data.idFlota : "Sin asignar") : "loading..."}</td>
                <td className="align-middle center">{loading ? data.licencia : "loading..."}</td>
                <td className="align-middle center">
                    <Star num={data.score}/>
                </td>
            </tr>
        </>)
    }
}

export default (Table)