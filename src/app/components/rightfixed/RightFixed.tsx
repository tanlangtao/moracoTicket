import React, { Component } from "react";
import "./rightfixed.scss";
import Index from "../../pages/index/Index";
import Icon from "../small/Icon";
import { im,topUp } from "../header/Header";
import Global from "../global/Global";
type Props = { app: Index };
type State = {  show: boolean;};
export default class RightFixed extends Component<Props, State> {
    state = {
        show: true,
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
        // window.open('http://entry.jsksafe.com/2/936175486/1/9589/2','black');
        alert('暂未开放！')
    }
    click7(){
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
}
