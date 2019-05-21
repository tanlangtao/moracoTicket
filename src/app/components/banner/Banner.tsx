import React, { FC } from "react";

import "./banner.scss";
import Icon from "../small/Icon";

let toLeft = ()=>{
    let carsel = document.getElementById('carsel');
    if(carsel){
        if(carsel.className==='carousel'){
            carsel.className= `carousel1`;
            carsel.style.transition ='left 1.5s';
        }else if(carsel.className==='carousel1'){
            carsel.className= `carousel2`;
        }else if(carsel.className==='carousel2'){
            carsel.className= `carousel3`;
        }else if(carsel.className==='carousel3'){
            carsel.style.transition ='left 0s';
            carsel.className= `carousel`;
        }
    }
    
}
let toRight = ()=>{
    let carsel = document.getElementById('carsel');
    if(carsel){
        if(carsel.className==='carousel'){
            carsel.style.transition ='left 0s';
            carsel.className= `carousel3`;
        }else if(carsel.className==='carousel3'){
            carsel.style.transition ='left 1.5s';
            carsel.className= `carousel2`;
        }else if(carsel.className==='carousel2'){
            carsel.className= `carousel1`;
        }else if(carsel.className==='carousel1'){
            carsel.className= `carousel`;
        }
    }
}
let timer = setInterval(()=>{
    toLeft()
},5000)
   
const Banner: FC = () => {
    return (
        <div className="banner" >
            <div className="carousel" id ='carsel'>
                <Icon className="carousel-img" src={require("../../../assets/hall/lunbo1.jpg")} />
                <Icon className="carousel-img" src={require("../../../assets/hall/lunbo2.jpg")} />
                <Icon className="carousel-img" src={require("../../../assets/hall/lunbo3.jpg")} />
                <Icon className="carousel-img" src={require("../../../assets/hall/lunbo4.jpg")} />
            </div>
            <div className = 'left-btn' onClick={toLeft}>
                <Icon className="left-img" src={require("../../../assets/hall/but_left.png")} />
            </div>
            <div className = 'right-btn' onClick={toRight}>
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
    );
};

export default Banner;
