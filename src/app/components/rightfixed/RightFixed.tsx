import React, { Component } from "react";
import "./rightfixed.scss";

import Icon from "../small/Icon";
type Props = {};

type State = {
    show: boolean;
};
let item = document.getElementsByClassName('carousel-img');
console.log(item);
export default class RightFixed extends Component<Props, State> {
    state = {
        show: true,
    };

    render() {
        
        return <div className="rightfixed" >
                    <Icon className="carousel" src={require("../../../assets/hall/sidebar.fdlansedise3a9f.png")} />
                    <div className="rightfixed-content">
                        <div className="right-item item1"  > </div>
                        <div className="right-item item2" > </div>
                        <div className="right-item item3" > </div>
                        <div className="right-item item4" > </div>
                        <div className="right-item item5" > </div>
                        <div className="right-item item6" onClick={()=>{
                            document.body.scrollTop = document.documentElement.scrollTop = 0;
                        }}> </div>
                    </div>
        </div>
    }

}
