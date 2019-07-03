import React, { Component } from "react";

import "./footer.scss";
import Icon from '../small/Icon';
type Props = {
    top: string;
};
type State = { 
    
 };

export default class Footer extends Component<Props, State> {
   render(){
        return (
            <div className="footer" style={{marginTop:`${this.props.top}`}} >
                <div className="footer-bottom">
                    <Icon src = {require('../../../assets/Index/logo.png')} className='footer-logo'/>
                    <div className="footer-font">
                        Global Service Building<br/>
                        Adresse:52e rue<br/>
                        De 9 heures à 18 heures du matin de 9 heures à 18 heures.<br/>
                    </div>
                </div>
            </div>
        );
   }
}
