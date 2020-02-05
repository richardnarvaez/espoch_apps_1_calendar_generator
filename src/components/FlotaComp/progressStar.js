import React from "react"
import Icon from '../../lib/svg';

class Star extends React.Component{
    constructor(props){
        super(props)
    }

    progress(op){
        if((op>0)&&(op<1) ){
            return(<>
                <Icon name="star-half" fill="#ff0000"/>
                <Icon name="star-empty" fill="#ff0000"/>
                <Icon name="star-empty" fill="#ff0000"/>
                <Icon name="star-empty" fill="#ff0000"/>
                <Icon name="star-empty" fill="#ff0000"/>
            </>)
        }
        if((op>=1)&&(op<1.5) ){
            return(<>
                <Icon name="star" fill="#ff0e00"/>
                <Icon name="star-empty" fill="#ff0e00"/>
                <Icon name="star-empty" fill="#ff0e00"/>
                <Icon name="star-empty" fill="#ff0e00"/>
                <Icon name="star-empty" fill="#ff0e00"/>
            </>)
        }
        if((op>=1.5)&&(op<2) ){
            return(<>
                <Icon name="star" fill="#ff3500"/>
                <Icon name="star-half" fill="#ff3500"/>
                <Icon name="star-empty" fill="#ff3500"/>
                <Icon name="star-empty" fill="#ff3500"/>
                <Icon name="star-empty" fill="#ff3500"/>
            </>)
        }
        if((op>=2)&&(op<2.5) ){
            return(<>
                <Icon name="star" fill="#ff4000"/>
                <Icon name="star" fill="#ff4000"/>
                <Icon name="star-empty" fill="#ff4000"/>
                <Icon name="star-empty" fill="#ff4000"/>
                <Icon name="star-empty" fill="#ff4000"/>
            </>)
        }
        if((op>=2.5)&&(op<3) ){
            return(<>
                <Icon name="star" fill="#ff4d0e"/>
                <Icon name="star" fill="#ff4d0e"/>
                <Icon name="star-half" fill="#ff4d0e"/>
                <Icon name="star-empty" fill="#ff4d0e"/>
                <Icon name="star-empty" fill="#ff4d0e"/>
            </>)
        }
        if((op>=3)&&(op<3.5) ){
            return(<>
                <Icon name="star" fill="#ff7c0e"/>
                <Icon name="star" fill="#ff7c0e"/>
                <Icon name="star" fill="#ff7c0e"/>
                <Icon name="star-empty" fill="#ff7c0e"/>
                <Icon name="star-empty" fill="#ff7c0e"/>
            </>)
        }
        if((op>=3.5)&&(op<4) ){
            return(<>
                <Icon name="star" fill="#ffaa24"/>
                <Icon name="star" fill="#ffaa24"/>
                <Icon name="star" fill="#ffaa24"/>
                <Icon name="star-half" fill="#ffaa24"/>
                <Icon name="star-empty" fill="#ffaa24"/>
            </>)
        }
        if((op>=4)&&(op<4.5) ){
            return(<>
                <Icon name="star" fill="#ffbf00"/>
                <Icon name="star" fill="#ffbf00"/>
                <Icon name="star" fill="#ffbf00"/>
                <Icon name="star" fill="#ffbf00"/>
                <Icon name="star-empty" fill="#ffbf00"/>
            </>)
        }
        if((op>=4.5)&&(op<5) ){
            return(<>
                <Icon name="star" fill="#ffd524"/>
                <Icon name="star" fill="#ffd524"/>
                <Icon name="star" fill="#ffd524"/>
                <Icon name="star" fill="#ffd524"/>
                <Icon name="star-half" fill="#ffd524"/>
            </>)
        }
        if((op==5)){
            return(<>
                <Icon name="star" fill="#ffff24"/>
                <Icon name="star" fill="#ffff24"/>
                <Icon name="star" fill="#ffff24"/>
                <Icon name="star" fill="#ffff24"/>
                <Icon name="star" fill="#ffff24"/>
            </>)
        }
    }
    render(){
        const num = this.props.num
        return(<>
            <div className="center">
                <p>{num}</p>
                {this.progress(num)}
            </div>
        </>)
    }
}

export default (Star)