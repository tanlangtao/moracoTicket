import React, { Component } from "react";
import Index from "../../pages/index/Index";

import "./loginModal.scss";
import { Modal, Checkbox, message } from "antd";
import Icon from "../small/Icon";
import Global from "../global/Global";
import Services from "../../services/Services";
import Storage from "../storage/Storage";
import Bottom from "../small/Bottom";

type Props = {
    app: Index;
    onClose: () => void;
    visible: boolean;
};

type State = {};

export default class LoginModal extends Component<Props, State> {
    app = this.props.app;

    account = "";
    password = "";

    render() {
        return (
            <Modal
                visible={this.props.visible}
                width={"70%"}
                footer={null}
                destroyOnClose={true}
                onCancel={() => this.props.onClose()}
                bodyStyle={{ padding: 0 }}
                closable={true}
                maskClosable={false}
            >
                <div className="login-component">
                    <div className="brand">
                        <Icon src={require("../../../assets/login/newqibaologoe16.png")} className="brand-img" />
                    </div>

                    <div className="login-box">
                        <div>
                            <div className="login-box-top">
                                <div className="code-login">注册</div>
                                <div className="services-online">在线客服</div>
                            </div>

                            <div className="login-box-middle">
                                <div className="account">
                                    <Icon src={require("../../../assets/login/txt_account.png")} className="account-img" />
                                    <input
                                        className="account-input"
                                        type="text"
                                        placeholder="请输入账号"
                                        onChange={e => (this.account = e.target.value)}
                                    />
                                </div>
                                <div className="password">
                                    <Icon src={require("../../../assets/login/txt_pwd.png")} className="password-img" />
                                    <input
                                        className="password-input"
                                        type="password"
                                        placeholder="请输入密码"
                                        onChange={e => (this.password = e.target.value)}
                                    />
                                </div>

                                <div className="remember-me">
                                    <Checkbox className="checkbox">记住密码</Checkbox>
                                    <div className="forget-password">忘记密码</div>
                                </div>

                                <div className="login-sumbit" onClick={() => this.login()}>
                                    <Icon src={require("../../../assets/login/txt_signIn.png")} className="login-sumbit-img" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="show">
                        <div>
                            <div className="show-box">
                                <Icon src={require("../../../assets/login/gameIntro.png")} className="show-icon" />
                                <div className="show-word-up">游戏说明</div>
                                <div className="show-word-down">请详细阅读说明</div>
                            </div>
                            <div className="show-box">
                                <Icon src={require("../../../assets/login/gameIntro.png")} className="show-icon" />
                                <div className="show-word-up">游戏说明</div>
                                <div className="show-word-down">请详细阅读说明</div>
                            </div>
                            <div className="show-box">
                                <Icon src={require("../../../assets/login/source.png")} className="show-icon" />
                                <div className="show-word-up">奖源公示</div>
                                <div className="show-word-down">真实奖源</div>
                            </div>
                            <div className="show-box">
                                <Icon src={require("../../../assets/login/source.png")} className="show-icon" />
                                <div className="show-word-up">奖源公示</div>
                                <div className="show-word-down">真实奖源</div>
                            </div>
                        </div>
                    </div>

                    <Bottom />
                </div>
            </Modal>
        );
    }

    async login() {
        if (this.account.length > 20) return message.error("账号太长!");
        if (this.password.length > 20) return message.error("密码太长!");
        if (!this.account.trim()) return message.error("账号不能为空!");
        if (!this.password.trim()) return message.error("密码不能为空!");

        message.loading("正在玩命奔袭...");

        await new Promise((r, j) => {
            setTimeout(() => {
                r();
            }, 500);
        });

        let login = await Services.officialLogin({
            package_name: Global.packageName,
            os: Global.os,
            uuid: Global.uuid,
            account_name: this.account,
            account_pass: this.password
        });

        if (!login.data) return message.error("登录异常,请稍后再试!");

        if (login.data.code !== 200) {
            message.destroy();
            switch (login.data.code) {
                case 511:
                    return message.error("用户名不能为空!");
                case 512:
                    return message.error("密码不能为空!");
                case 513:
                    return message.error("UUID不能为空!");
                case 520:
                    return message.error("PACKAGE不能为空!");
                case 521:
                    return message.error("OS不能为空!");
                case 514:
                    return message.error("账号不存在!");
                case 515:
                    return message.error("密码不正确!");
                default:
                    return message.error("账号异常!", login.data.code);
            }
        }

        let user = login.data.msg;

        Storage.setUserInfo(user);

        this.app.login();

        message.destroy();

        message.success("登录成功!");

        this.props.onClose();
    }
}
