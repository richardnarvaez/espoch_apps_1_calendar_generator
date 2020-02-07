import React from 'react';

class Nodata extends React.Component{
    
    render(){

        return(<>        
        {/*Mensaje1 no hay datoo */}
        
        <div className={"align-items-center"}style={{justifyContent: "center" , height: "100vh", top: 0, bottom: 0, left: 0, right: 0, zIndex: 200, position: "absolute", display: "flex"}} >
            <div style={{justifyContent: "center" , height: "100vh", background: "#00000025", top: 0, bottom: 0, left: 0, right: 0, zIndex: 100, position: "absolute",}} 
                onClick={()=> {this.props.onClick()}}/>
                
                <div className="card d-flex align-items-center" style={{width: "450px", background: "#fff",zIndex: 100}}>
                    <div>
                        <text className="text-dangerous">
                            NO EXISTEN DATOS !
                        </text>
                    </div>
                </div>
            </div>
        </>)
    }
}


export default (Nodata)