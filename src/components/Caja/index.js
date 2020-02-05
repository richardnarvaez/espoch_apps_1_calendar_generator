import React from 'react';
import Navigation from '../Navigation';
import Table from '../CajaComp/tableCaja';
import Modal from '../CajaComp/modal'
import  { withFirebase } from '../Firebase';
import DatePicker from "react-datepicker";   
import "react-datepicker/dist/react-datepicker.css"          

class Caja extends React.Component{

    constructor(props){
        super(props)
        this.state={
            data: [],
            dataflota:[],
            loading: false,
            id: null,
            showCajaModal: false,
            startDate: new Date(),
  
            notExist: false,
  
            scrh: "Todos",
        }            
    }

    componentDidMount(){
        this.props.firebase.getLive("/flota", 
        data => {
            if(data.exists()){
                this.setState({
                    data: Object.values(data.val()),
                    loading: true
                })
                console.log("DATAAAAAAAAA: ", this.state.data)
            }else{
                this.setState({
                    data: null,
                    loading: false,
                    notExist: true
                })
            }
        })
    }

    handleChange = date => {
        this.setState({
          startDate: date
        });
    };

    showModal(key){
        this.setState({showCajaModal: true})
        this.setState({id: key})
    }

    renderModal(){
        const {data, loading, id} = this.state
        return(<>
            {id != null ? 
                <Modal data={data[id]} loading={loading}
                firebase={this.props.firebase} date={this.state.startDate} id={id}/>
            :
                null
            }   
        </>)
    }

    render(){
        return(<>
            <div className="row">
                <Navigation menu="caja"/>
                <div className="scroll col-10"> 
                    <div className="container">
                    {/* Header */}
                        <div className="row d-flex align-items-center justify-content-between">    
                            <div className="spaceUp">
                                <h1 style={{color:'#3941ca'}}>Caja</h1>
                            </div>
                        </div>
                    {/* Header */}
                        <DatePicker
                            selected={this.state.startDate}
                            onChange={this.handleChange}
                        />
                        <Table callBack={this.showModal.bind(this)} data={this.state.data}
                        date={this.state.startDate}
                        loading={this.state.loading} notExist={this.state.notExist}/>
                        {this.renderModal()}
                    </div>
                </div>
            </div>
        </>)
    }
}

export default withFirebase (Caja)