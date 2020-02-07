import React from 'react'

class Modal extends React.Component{

    constructor(props){
        super(props)
        this.state={
            store: [],
            orders: [],
            filterOrders: [],
            loadingStore: false,
            loadingOrders: false,
            count: [],
            placa: "",
        }
    }

    componentDidMount(){
        this.props.firebase.get("/store/category/gas", 
        data =>{
            this.setState({
                store: Object.values(data.val()).reverse(),
                loadingStore: true
            })
        })
        this.setState({placa: this.props.data.placa})
        this.getOrders(this.props.data.placa)
    }
    
    componentDidUpdate(prevProps){
        if(this.props.date !== prevProps.date){
            this.setState({placa: this.props.data.placa})
            this.getOrders(this.props.data.placa)
        }
        if(this.props.id !== prevProps.id){
            this.setState({placa: this.props.data.placa})
            this.getOrders(this.props.data.placa)
        }
    }

    getDateMillis(){
        let date = this.props.date
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        let currentDate = year+ "/" + month +  "/" +day
        return(Date.parse(currentDate))
    }

    getCurrentDate(){
        let date = this.props.date
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        let currentDate = day + "/" + month + "/" + year
        return(currentDate)
    }

    async getOrders(placa){
        await this.props.firebase.filterDate("/orders", placa,
        data => {
            if ( data.val()!=null && data.val()!=undefined ){
                this.setState({
                    orders: Object.values(data.val()),
                    loadingOrders: true,
                })
            }else{
                this.setState({
                    loadingOrders: false,
                })
            }
        },
        error=>{console.log("Error",error);})
        this.filterOrders()
    }

    filterOrders(){
        let order = this.state.orders
        let filterOrders = []
        let count = [0,0,0]
        let currentDate = this.getDateMillis()
        let tomorrowDate = currentDate + 86400000
        if(order.lenght != 0){
            for(let i=0;i<order.length; i++){
                if(order[i].delivered === "true"){
                    if((order[i].date > currentDate) && ( order[i].date < tomorrowDate)){
                        let countArray = Object.values(order[i].count)
                        let limit = countArray.length
                        filterOrders.push(order[i])
                        console.log("lista FILTRADA", filterOrders)
                        for(let j=0;j<limit;j++){
                            count[j] = count[j] + countArray[j].numero
                        }
                    }
                }
            }
        }
        this.setState({filterOrders: filterOrders})
        this.setState({count: count})
    }

    numberOrders(){
        let count = this.state.count
        let total = 0
        for(let i=0;i<count.length;i++){
            total = total + count[i] 
        }
        return(total)
    }

    numberOrdersCanceled(){
        let order = this.state.orders
        let canceled = 0
        let currentDate = this.getDateMillis()
        let tomorrowDate = currentDate + 86400000
        if(order.length != 0){
            for(let i=0; i<order.length;i++){
                if(order[i].delivered === "canceled"){
                    if((order[i].date > currentDate) && ( order[i].date < tomorrowDate)){
                        canceled++
                    }
                }
            }
        }
        return(canceled)
    }

    totalSold(){
        let count = this.state.count
        let store = this.state.store
        let total = 0
        for(let i=0;i<count.length;i++){
            total = total + (count[i] * store[i].price)
        }
        return(total.toFixed(2))
    }

    render(){
        const {data, loading} = this.props
        const {loadingOrders} = this.state
        return(<>
            <div className="modal fade" id="modalCaja" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">{"Fecha: "+ this.getCurrentDate()}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row justify-content-between">
                                <h4>
                                    {loading ? data.placa :  "loading"}
                                </h4>
                                {loading ?
                                    data.isActive === "true" ? 
                                        <h3 className="statusGreen">
                                            Activo
                                        </h3>
                                    :
                                        <h3 className="statusRed">
                                            Fuera de servicio
                                        </h3>
                                :
                                    "loading"
                                }
                                
                            </div>

                            <div>
                                <p className="bold" style={{fontSize: 14}}>Lista de pedidos realizados</p>
                            </div>

                            <div className="scroll" style={{maxHeight: 225}}>

                                {((this.state.filterOrders.length != 0) && (loadingOrders)) ? 
                                    this.state.filterOrders.map((item, i) =>{
                                        return(
                                            <RowOrders data={item} key={i}/>
                                        )
                                    })
                                :
                                    <div className="d-flex justify-content-center">
                                        <p className="align-items-center">No se han realizado pedidos en esta Fecha</p>
                                    </div>
                                }
                            </div>

                            <div className="border-bottom"/>

                            <div>
                                <p className="bold" style={{fontSize: 14}}>Número de Cilindros de Gas por tipo</p>
                            </div>

                            {this.state.count.map((item, i)=>{
                                return(
                                    <RowCaja data={item} store={this.state.store} key={i} id={i} avalible={loadingOrders}/>   
                                )
                            })
                            }
                            
                            <div className="border-top">
                                <div>
                                    <p className="bold" style={{fontSize: 14}}>Resumen de ventas del día</p>
                                </div>
                                <div className="row justify-content-between ">
                                    <div className="row">
                                        <p className="spaceLeft">{loadingOrders ? this.numberOrders() : "0"}</p>
                                        <p className="spaceLeftWord">Cilindros de gas</p>
                                    </div>
                                    <div>
                                        <p className="spaceRight bold">{loadingOrders ? "$" + this.totalSold() : "$0.00"}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <p className="spaceLeft">{loadingOrders ? this.state.filterOrders.length : "0"}</p>
                                    <p className="spaceLeftWord">Pedidos Realizados</p>
                                </div>
                                <div className="row">
                                    <p className="spaceLeft">{loadingOrders ? this.numberOrdersCanceled() : "0"}</p>
                                    <p className="spaceLeftWord">Pedidos Cancelados</p>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>)
    }
}

class RowCaja extends React.Component{
    render() {
        const {data, store, id, avalible} = this.props
        const value = (data * store[id].price)
        return (<>
            <div className="row justify-content-between">
                <div className="row">
                    <div style={{maxWidth: 10}}>
                        <p>{avalible ? data : "0"}</p>
                    </div>
                    <div>
                        <p className="spaceLeft">{store[id].name}</p>
                    </div>
                </div>
                <div>
                    <p className="spaceRight">{avalible ? "$"+value.toFixed(2) : "$0.00"}</p>
                </div>
            </div>   
        </>)
    }
}

class RowOrders extends React.Component{

    numberOrders(){
        let count =  Object.values(this.props.data.count)
        let aux = 0;
        for(let i=0; i<count.length; i++){
            aux = aux + count[i].numero
        }
        return(aux)
    }

    render(){
        const {data} = this.props
        return(<>
            <div className="border-top spaceTable">
                <div className="row justify-content-between align-items-center">
                    <div className="justify-content-center">
                        <div className="row" >
                            <p className="bold" style={{fontSize: 16}}>{this.numberOrders()}</p>
                            <p className="spaceLeftWord" style={{fontSize: 16}}>cilindros</p>
                        </div>
                        <div>
                            <p style={{fontSize: 12}}>{data.user.username}</p>
                        </div>
                    </div>
                    <div>
                        <p className="spaceRight">{"$" + data.total}</p>
                    </div>
                </div>
            </div>
        </>)
    }
}

export default Modal