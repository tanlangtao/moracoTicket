import React, { Component } from "react";
import "./rightfixed.scss";
import Index from "../../pages/index/Index";
import Icon from "../small/Icon";
import { im,topUp } from "../header/Header";
import Global from "../global/Global";
type Props = { app: Index };
type State = {  show: boolean;showEWM:boolean;platform:boolean};
export default class RightFixed extends Component<Props, State> {
    state = {
        show: true,
        showEWM:false,
        platform:false
    };
    app = this.props.app;

    render() {
        
        return <div className="rightfixed" >
                    <Icon className="carousel2" src={require("../../../assets/hall/sidebar.fdlansedise3a9f.png")} />
                    <div className="rightfixed-content">
                        <div className="right-item item1" onClick={()=>this.click1()} > </div>
                        <div className="right-item item2" onClick={()=>this.click2()} > </div>
                        <div className="right-item item3" onClick={()=>this.click3()}> </div>
                        <div className="right-item item4" onClick={()=>this.click4()}> </div>
                        <div className="right-item item5" onClick={()=>this.click5()}> </div>
                        <div className="right-item item6" onClick={()=>this.click6()}> </div>
                        <div className="right-item item7" onClick={()=>this.click7()}> </div>
                    </div>
                    {
                        this.state.showEWM?
                            <div className="erweima-box">
                                {
                                    this.state.platform?
                                    <div>
                                        <span className="erweima-box-font" onClick={()=>this.click8()}>安卓下载(切换苹果)</span>
                                        <Icon className="erweima-box-img" src={require("../../../assets/hall/andriodM.png")} />
                                    </div>
                                    :<div>
                                        <span className="erweima-box-font" onClick={()=>this.click8()}>苹果下载(切换安卓)</span>
                                        <Icon className="erweima-box-img" src={require("../../../assets/hall/iosM.png")} />
                                    </div>
                                }
                            </div>
                        :null
                    }
        </div>
    }

    click1(){
        window.open('http://www.manycai.com/','black');
    }
    click2(){
        if (!Global.isLogin()) {
            return this.app.userTips!.login();
        }
        this.app.header!.onClose();
        let timer = setTimeout(()=>{
            if(this.app.header){
                im(this.app.header)
            }
            clearTimeout(timer)
        },500)
    }
    click3(){
        window.open('https://pan.baidu.com/s/1tt8f4A5iR3eGhYQa06QXDg','black');
    }
    click4(){
        window.open('http://7baogame.com/','black');
    }
    click5(){
        if (!Global.isLogin()) {
            return this.app.userTips!.login();
        }
        this.app.header!.onClose();
        let timer = setTimeout(()=>{
            if(this.app.header){
                topUp(this.app.header)
            }
            clearTimeout(timer)
        },500)
    }
    click6(){
        this.setState({
            showEWM:!this.state.showEWM
        })
    }
    click7(){
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
    click8(){
        this.setState({
            platform:!this.state.platform
        })
    }
}
