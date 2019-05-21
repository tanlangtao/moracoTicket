import React, { Component } from "react";

import "./userTips.scss";
import Icon from "../small/Icon";
import Index from "../../pages/index/Index";
import LoginModal from "../login/LoginModal";
import Storage from "../storage/Storage";
import { Modal } from "antd";

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

    hiddemModal() {
        this.setState({ showLogin: false });
    }

    showModal() {
        this.setState({ showLogin: true });
    }

    componentWillMount() {}

    render() {
        // USER
        let userInfo = this.props.app.state.userInfo;
        let isLogin = this.props.app.state.isLogin;

        let welcome = isLogin ? (
            <div className="welcome">
                <div className="word">欢迎您 ,</div>
                <div className="name">{userInfo.game_user.game_nick}</div>
                <Icon className="icon" src={require("../../../assets/hall/icon_mail.png")} />
                <div className="quit">
                    <div className="pre-info">预留信息 :</div>
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
                        <div className="refresh">刷新</div>
                        <Icon className="eye" src={require("../../../assets/hall/visible.png")} />
                        <div className="top-up">充值</div>
                        <div className="top-down">提款</div>
                        <Icon src={require("../../../assets/hall/icon_CS.png")} />
                        <div className="services">客服</div>
                    </div>
                    <LoginModal app={this.props.app} onClose={() => this.hiddemModal()} visible={this.state.showLogin} />
               </div>
            </div>
        );
    }
}

export default UserTips;
