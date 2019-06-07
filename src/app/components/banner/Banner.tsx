
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
    width:number;
    height:number;
};

export default class Banner extends Component<Props, State> {
    state = {
        visible: false,
        select: "游戏大厅",
        income:0,
        width:document.body.clientWidth,
        height:document.body.clientWidth/4.413

    };
    timer = setInterval(()=>{},0)
    idx = 0;
    carousel!:HTMLElement|null;

    componentDidMount(){
       this.setTimer();
       this.clientResize()
    }
    toLeft(){
            this.carousel!.style.transition ='left 0s';
            this.idx += 1;
            if(this.idx === 1){
                this.idx = -4;
                this.carousel!.style.transition ='left 0s';
            }else{
                this.carousel!.style.transition ='left 1.5s';
            }
            this.carousel!.style.left  = `${this.idx*this.state.width}px`
    }
    toRight(){
            this.carousel!.style.transition ='left 0s';
            this.idx -= 1;
            if(this.idx === -5){
                this.idx = 0;
                this.carousel!.style.transition ='left 0s';
            }else{
                this.carousel!.style.transition ='left 1.5s';
            }
            this.carousel!.style.left  = `${this.idx*this.state.width}px`
    }
    setTimer(){
        let self = this;
        clearInterval(this.timer)
        this.timer = setInterval(()=>{
            self.toRight()
        },6500)
    }
    clearTimer(){
        clearInterval(this.timer)
    }
    clientResize(){
        window.addEventListener('resize',()=>{
            this.setState({
                width:document.body.clientWidth,
                height:document.body.clientWidth/4.413
            })
        })
    }
    render(){
        return (
            <div className="banner" style={{height:`${this.state.height+5}px`}} >
                <div className="carousel" ref={carousel=>this.carousel = carousel} style={{height:`${this.state.height}px`}} >
                    <div className="carousel-img" style={{background:`url(${require("../../../assets/hall/lunbo1.jpg")})`,width:`${this.state.width}px`,height:`${this.state.height}px`,float:'left',backgroundSize:'100% 100%'}}></div>
                    <div className="carousel-img" style={{background:`url(${require("../../../assets/hall/lunbo2.jpg")})`,width:`${this.state.width}px`,height:`${this.state.height}px`,float:'left',backgroundSize:'100% 100%'}}></div>
                    <div className="carousel-img" style={{background:`url(${require("../../../assets/hall/lunbo3.jpg")})`,width:`${this.state.width}px`,height:`${this.state.height}px`,float:'left',backgroundSize:'100% 100%'}}></div>
                    <div className="carousel-img" style={{background:`url(${require("../../../assets/hall/lunbo4.jpg")})`,width:`${this.state.width}px`,height:`${this.state.height}px`,float:'left',backgroundSize:'100% 100%'}}></div>
                    <div className="carousel-img" style={{background:`url(${require("../../../assets/hall/lunbo1.jpg")})`,width:`${this.state.width}px`,height:`${this.state.height}px`,float:'left',backgroundSize:'100% 100%'}}></div>
                    <div className="carousel-img" style={{background:`url(${require("../../../assets/hall/lunbo2.jpg")})`,width:`${this.state.width}px`,height:`${this.state.height}px`,float:'left',backgroundSize:'100% 100%'}}></div>
                    <div className="carousel-img" style={{background:`url(${require("../../../assets/hall/lunbo3.jpg")})`,width:`${this.state.width}px`,height:`${this.state.height}px`,float:'left',backgroundSize:'100% 100%'}}></div>
                    <div className="carousel-img" style={{background:`url(${require("../../../assets/hall/lunbo4.jpg")})`,width:`${this.state.width}px`,height:`${this.state.height}px`,float:'left',backgroundSize:'100% 100%'}}></div>
                </div>
                <div className = 'left-btn' onClick={()=>this.toLeft()} onMouseEnter={()=>this.clearTimer()} onMouseLeave={()=>this.setTimer()}>
                    <Icon className="left-img" src={require("../../../assets/hall/but_left.png")} />
                </div>
                <div className = 'right-btn' onClick={()=>this.toRight()} onMouseEnter={()=>this.clearTimer()} onMouseLeave={()=>this.setTimer()}>
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
