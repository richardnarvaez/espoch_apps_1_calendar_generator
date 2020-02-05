import React from 'react'
import  { withFirebase } from '../Firebase';

class Table extends React.Component{
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
                <tbody>
                    {
                        ((loading == true) && (notExist == false)) ?
                        data.map((item, i) => {
                            return(
                                <Row callBack={this.props.callBack.bind()}
                                firebase={this.props.firebase}
                                key={i} data={item} loading={loading} id={i} date={this.props.date}/>
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
        this.state={
            orders: [],
            loading: false,
        }
    }

    componentDidMount(){
        this.getOrders()
    }

    componentDidUpdate(prevProps){
        if(this.props.date !== prevProps.date){
            this.getOrders()
        }
    }

    async getOrders(){
        await this.props.firebase.filterDate("/orders", this.props.data.placa,
        data => {
            if ( data.val()!=null && data.val()!=undefined ){
                this.setState({
                    orders: Object.values(data.val()),
                    loading: true,
                })
            }else{
                this.setState({
                    loading: false,
                })
            }
        },
        error=>{console.log("Error",error);})
    }

    getDateMillis(){
        let date = this.props.date
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        let currentDate = year+ "/" + month +  "/" +day
        return(Date.parse(currentDate))
    }

    totalVentas(){
        let order = this.state.orders
        let total = 0
        let currentDate = this.getDateMillis()
        let tomorrowDate = currentDate + 86400000
        if(order.length != 0){
            for(let i=0;i<order.length; i++){
                if(order[i].delivered === "true"){
                    if((order[i].date > currentDate) && ( order[i].date < tomorrowDate)){
                        total = total + order[i].total
                    }
                }
            }
        }
        return(total.toFixed(2))
    }

    totalDeliveredOrder(){
        let order = this.state.orders
        let total = 0
        let currentDate = this.getDateMillis()
        let tomorrowDate = currentDate + 86400000
        if(order.length != 0){
            for(let i=0;i<order.length; i++){
                if(order[i].delivered === "true"){
                    if((order[i].date > currentDate) && ( order[i].date < tomorrowDate)){
                        total++
                    }
                }
            }
        }
        return(total)
    }

    render(){
        const {loading, data, id} = this.props
        return(<>
            <tr data-toggle="modal" data-target="#modalCaja" onClick={()=> {this.props.callBack(id)}}>
                {/* <th scope="row">#1</th> */}
                <td className="align-middle center">
                    <img src={loading ? data.urlCar : "loading"}></img>
                </td>
                <td className="align-middle center">
                <p style={{display: 'inline-block'}}>{loading ? data.placa : "loading"}</p>
                </td>
                <td className="align-middle center">{loading ? 
                    data.isActive === "true" ?
                        <p className="statusGreen">Activo</p> 
                    : 
                        <p className="statusRed">Fuera de Servicio</p> 
                :
                    "loading"
                }</td>
                <td className="align-middle center">{"$" + this.totalVentas()}</td>
                <td className="align-middle center">{this.totalDeliveredOrder() +" ordenes"}</td>
            </tr>
        </>)
    }
}

export default withFirebase(Table)