
import React, { Component } from "react";
import Icon from "../small/Icon";
import Index from "../../pages/index/Index";
import "./banner.scss";
type Props = {
    app: Index;
};

type State = {
    select: string;
    visible: boolean;
    income :number;
};

let idx = 0;
let width = 1920;
let toLeft = ()=>{
    let carsel = document.getElementById('carsel');
    if(carsel){
        carsel.style.transition ='left 0s';
        idx += 1;
        if(idx === 1){
            idx = -4;
            carsel.style.transition ='left 0s';
        }else{
            carsel.style.transition ='left 1.5s';
        }
        carsel.style.left  = `${idx*width}px`
    }
    
}
let toRight = ()=>{
    let carsel = document.getElementById('carsel');
    if(carsel){
        carsel.style.transition ='left 0s';
        idx -= 1;
        if(idx === -5){
            idx = 0;
            carsel.style.transition ='left 0s';
        }else{
            carsel.style.transition ='left 1.5s';
        }
        carsel.style.left  = `${idx*width}px`
    }
}

export default class Banner extends Component<Props, State> {
    state = {
        visible: false,
        select: "游戏大厅",
        income:0
    };
    timer = setInterval(()=>{},0)
    componentDidMount(){
       this.setTimer()
    }

    setTimer(){
        this.timer = setInterval(()=>{
            toRight()
        },6500)
    }
    clearTimer(){
        clearInterval(this.timer)
    }
    render(){
        return (
            <div className="banner" >
                <div className="carousel" id ='carsel'>
                    <Icon className="carousel-img" src={require("../../../assets/hall/lunbo1.jpg")} />
                    <Icon className="carousel-img" src={require("../../../assets/hall/lunbo2.jpg")} />
                    <Icon className="carousel-img" src={require("../../../assets/hall/lunbo3.jpg")} />
                    <Icon className="carousel-img" src={require("../../../assets/hall/lunbo4.jpg")} />
                    <Icon className="carousel-img" src={require("../../../assets/hall/lunbo1.jpg")} />
                    <Icon className="carousel-img" src={require("../../../assets/hall/lunbo2.jpg")} />
                    <Icon className="carousel-img" src={require("../../../assets/hall/lunbo3.jpg")} />
                    <Icon className="carousel-img" src={require("../../../assets/hall/lunbo4.jpg")} />
                </div>
                <div className = 'left-btn' onClick={toLeft} onMouseEnter={()=>this.clearTimer()} onMouseLeave={()=>this.setTimer()}>
                    <Icon className="left-img" src={require("../../../assets/hall/but_left.png")} />
                </div>
                <div className = 'right-btn' onClick={toRight} onMouseEnter={()=>this.clearTimer()} onMouseLeave={()=>this.setTimer()}>
                    <Icon className="left-img" src={require("../../../assets/hall/but_right.png")} />   
                </div>
                {/* <div className="left-icon">
                    <Icon className="left-img" src={require("../../../assets/hall/new_icon.24xinshoue16.png")} />
                    <div className="word">全新改版 不一样的棋牌体验 尽在七宝棋牌</div>
                </div> */}
                <div className="bottom-icon">
                    <Icon className="bottim-img" src={require("../../../assets/hall/nav_back_bg_fd2506e.png")} />
                </div>
            </div>
        )
    }

}
