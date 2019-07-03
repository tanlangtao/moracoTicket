
import React, { Component } from "react";
import Icon from "../small/Icon";
import Index from "../../pages/index/Index";
import "./banner.scss";
import History from '../../pages/history/History';
type Props = {
    app: Index|History;
};
type State = {
    width:number;
    height:number;
};

export default class Banner extends Component<Props, State> {
    
    render(){
        return (
            <div className="banner" >
                 <div className='banner-box'>
                    <Icon src={require('../../../assets/Index/banner.jpg')} className='banner-Icon'/>
                </div>
            </div>
        )
    }

}
