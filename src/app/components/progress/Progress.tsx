import React, { Component } from "react";
import "./progress.scss";
type Props = {
    progressBarwidth:number,
    propborder:number
};

type State = {
    show: boolean;
    progress: number;
};

export default class Progress extends Component<Props, State> {
    state = {
        show: true,
        progress: 0
    };
    render() {
        return this.state.show ? (
            <div className="progress" style={{background:`url(${this.props.propborder === 1? require('../../../assets/game/shubanbeijing.jpg'):require('../../../assets/game/login.jpg')})`,backgroundSize:'100% 100%'}}>
                <div className="progress-icon" style={{
                    width:`${this.props.propborder === 1? '320px':'450px'}`,
                    height:`${this.props.propborder === 1? '180px':'250px'}`,
                    background:`${require('../../../assets/game/newqibaologoe16.png')}`,
                    backgroundSize:'100% 100%',
                    bottom:`${this.props.propborder === 1?'40%':'27%'}`,
                    }}></div>
                <div className='progress-bar'>
                    <span className='progress-bar-span' style={{width:`${this.props.progressBarwidth/2/100*this.state.progress}px`}}></span>
                </div>
                <div className="progress-title">正在载入游戏,请稍后...{this.state.progress} %</div>
                <div className="progress-footer1">抵制不良游戏 拒绝盗版游戏 注意自我保护 谨防受骗上当</div>
                <div className="progress-footer2">适度游戏益脑 沉迷游戏伤身 合理安排时间 享受健康生活</div>
            </div>
        ) : null;
    }

    close() {
        this.setState({ show: false });
    }

    open() {
        this.setState({ show: true });
    }

    onProgress(progress: any) {
        let p = ((progress.current / progress.total) * 100).toFixed(1);

        this.setState({ progress: parseFloat(p) });
    }
}
