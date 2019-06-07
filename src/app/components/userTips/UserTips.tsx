import React, { Component } from "react";

import "./userTips.scss";
import Icon from "../small/Icon";
import Index from "../../pages/index/Index";
import LoginModal from "../login/LoginModal";
import Storage from "../storage/Storage";
import { Modal } from "antd";
import { im,topUp,topDown } from "../header/Header";
type Props = {
    app: Index;
};
type State = {
    showLogin: boolean;
};

class UserTips extends Component<Props, State> {
    state = {
        showLogin: false
    };

    app =this.props.app;

    login() {
        this.showModal();
    }

    quit() {
        Modal.confirm({
            title: "确定要退出登录吗?",
            cancelText: "再玩一会",
            okText: "退出",
            onOk: () => {
                Storage.delUserInfo();
                // this.props.app.login();
                window.location.reload();
            },
            onCancel: () => {
                console.log("Cancel");
            }
        });
    }
    reload(){
       window.location.reload()
    }
    hiddemModal() {
        this.setState({ showLogin: false });
    }

    showModal() {
        this.setState({ showLogin: true });
    }

    componentWillMount() {}

    openIm(){
        if(this.app.header){
            im(this.app.header)
        }
    }

    openPay(){
        if(this.app.header){
            topUp(this.app.header)
        }
    }

    openCash(){
        if(this.app.header){
            topDown(this.app.header)
        }
    }
    render() {
        // USER
        let userInfo = this.props.app.state.userInfo;
        let isLogin = this.props.app.state.isLogin;

        let welcome = isLogin ? (
            <div className="welcome">
                <div className="word">欢迎您 ,</div>
                <div className="name">{userInfo.game_user.game_nick}</div>
                <div className="word">(ID: {userInfo.game_user.id})</div>
                {/* <Icon className="icon" src={require("../../../assets/hall/icon_mail.png")} /> */}
                <div className="quit">
                    <div className="pre-info"></div>
                    <div className="safe-quit" onClick={() => this.quit()}>
                        安全退出
                    </div>
                </div>
            </div>
        ) : (
            <div className="welcome">
                <div className="login-button" onClick={() => this.login()}>
                    登录
                </div>
            </div>
        );
        
        let balance = userInfo.game_user.game_gold ? userInfo.game_user.game_gold.toFixed(4) : "0.0000";

        return (
            <div className="user-tips">
               <div className='content'>
                    <div className="left">{welcome}</div>
                    <div className="right">
                        <div className="balance">金币余额: {balance}</div>
                        <div className="refresh" onClick={()=>this.reload()} >刷新</div>
                        <Icon className="eye" src={require("../../../assets/hall/visible.png")} />
                        <div className="top-up" onClick={()=>this.openPay()}>充值</div>
                        <div className="top-down"  onClick={()=>this.openCash()}>提款</div>
                        <Icon src={require("../../../assets/hall/icon_CS.png")} />
                        <div className="services"  onClick={()=>this.openIm()}>客服</div>
                    </div>
                    <LoginModal app={this.props.app} onClose={() => this.hiddemModal()} visible={this.state.showLogin} />
               </div>
            </div>
        );
    }


}

export default UserTips;
