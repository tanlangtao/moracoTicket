import React, { Component,  } from "react";
import "./header.scss";
import Index from "../../pages/index/Index";
import History from '../../pages/history/History';
type Props = {
    app: Index|History;
};

type State = {
    select: string;
    visible: boolean;
    income :number;
};
export default class Header extends Component<Props, State> {
    // APP
    app = this.props.app;

    logoClick(){
        window.location.hash =`/`
    }
    render() {
        return (
            <div className="header">
                <div className="header-content">
                    <h1 className='header-logo' onClick={()=>this.logoClick()}>moraco</h1>
                    <span className='header-font'>Ce site ne offrit que le service abonnement, ne fournit pas les
                        services achetés.</span>
                </div>
            </div>
        );
    }
}
