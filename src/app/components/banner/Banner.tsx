import React, { FC } from "react";

import "./banner.scss";
import Icon from "../small/Icon";

const Banner: FC = () => {
    return (
        <div className="banner">
            <div className="carousel">
                <Icon className="carousel-img" src={require("../../../assets/hall/lunbo1.jpg")} />
            </div>
            <div className="left-icon">
                <Icon className="left-img" src={require("../../../assets/hall/new_icon.24xinshoue16.png")} />
                <div className="word">全新改版 不一样的棋牌体验 尽在七宝棋牌</div>
            </div>
            <div className="bottom-icon">
                <Icon className="bottim-img" src={require("../../../assets/hall/nav_back_bg_fd2506e.png")} />
            </div>
        </div>
    );
};

export default Banner;
