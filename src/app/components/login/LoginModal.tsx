import React, { Component } from "react";
import Index from "../../pages/index/Index";

import "./loginModal.scss";
import { Modal, Checkbox, message } from "antd";
import Global from "../global/Global";
import Services from "../../services/Services";
import Storage from "../storage/Storage";

type Props = {
    app: Index;
    onClose: () => void;
    visible: boolean;
};

type State = {
    router: string;
};

export default class LoginModal extends Component<Props, State> {
    app = this.props.app;

    account = "";
    password = "";

    reginAccount = "";
    reginPassword = "";
    reginNick = "";
    reginPasswordRepreat = "";

    state = {
        router: "login"
    };
    render() {
        return (
            <Modal
                visible={this.props.visible}
                width={"480px"}
                footer={null}
                destroyOnClose={true}
                onCancel={() => this.props.onClose()}
                bodyStyle={{
                    width:'480px',
                    margin:0,
                    padding:0,
                    position:'absolute'
                }}
                closable={false}
                maskClosable={false}
                keyboard = {true}
            >
                <div className="login-component">
                    <div className="brand">
                    </div>
                    <div className="login-box">
                        <div>
                            <div className="login-box-top">
                                {/* <div onClick={() => this.changeRouter()} className="code-login">
                                    {this.state.router === "login" ? "注册" : "登陆"}
                                </div> */}
                                <div className="code-login">在线客服</div>
                                <div className="services-online" onClick={()=>this.props.onClose()}>关闭</div>
                            </div>

                            {this.state.router === "login" ? (
                                <div className="login-box-middle">
                                    <div className = 'login-logo'></div>
                                    <div className="account">
                                        <div className="left-title" style={{background:`url(${require('../../../assets/login/txt_account.png')}) no-repeat`,backgroundSize:'contain'}}></div>
                                        <input
                                            autoComplete="off"
                                            className="account-input"
                                            type="text"
                                            placeholder="请输入账号"
                                            onChange={e => (this.account = e.target.value)}
                                        />
                                    </div>
                                    <div className="password">
                                        <div className="left-title" style={{background:`url(${require('../../../assets/login/txt_pwd.png')}) no-repeat `,backgroundSize:'contain'}}></div>
                                        <input
                                            autoComplete="off"
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

                                    <div className="login-sumbit"  onClick={() => this.login()}>
                                        
                                    </div>
                                </div>
                            ) : (
                                <div className="regin-box-middle">
                                    <div className="account">
                                        <div className="left-title">账号</div>
                                        <input
                                            autoComplete="off"
                                            className="account-input"
                                            type="text"
                                            placeholder="请输入账号"
                                            onChange={e => (this.reginAccount = e.target.value)}
                                        />
                                    </div>
                                    <div className="nick">
                                        <div className="left-title">昵称</div>
                                        <input
                                            autoComplete="off"
                                            className="nick-input"
                                            type="text"
                                            placeholder="请输入账号"
                                            onChange={e => (this.reginNick = e.target.value)}
                                        />
                                    </div>
                                    <div className="password">
                                        <div className="left-title">密码</div>
                                        <input
                                            autoComplete="off"
                                            className="password-input"
                                            type="password"
                                            placeholder="请输入密码"
                                            onChange={e => (this.reginPassword = e.target.value)}
                                        />
                                    </div>
                                    <div className="password">
                                        <div className="left-title">确认</div>
                                        <input
                                            autoComplete="off"
                                            className="password-input"
                                            type="password"
                                            placeholder="请再次输入密码"
                                            onChange={e => (this.reginPasswordRepreat = e.target.value)}
                                        />
                                    </div>

                                    <div className="regin-sumbit" onClick={() => this.regin()}>
                                        注册
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* <div className="show">
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
                    </div> */}

                    {/* <Bottom /> */}
                </div>
            </Modal>
        );
    }

    error(msg: string): any {
        message.destroy();
        return message.error(msg);
    }

    async regin() {
        if (!this.reginAccount.trim()) return this.error("账号不能为空!");
        if (!this.reginNick.trim()) return this.error("昵称不能为空!");
        if (!this.reginPassword.trim()) return this.error("密码不能为空!");
        if (this.reginPassword !== this.reginPasswordRepreat) return this.error("两次密码输入不相等!");

        if (this.reginAccount.length < 6) return this.error("账号最少6位字母数字!");
        if (this.reginAccount.length > 12) return this.error("账号最多12位字母数字!");
        if (!/^[a-zA-Z0-9]+$/.test(this.reginAccount)) return this.error("账号只能是字母数字!");

        if (this.reginNick.length < 4) return this.error("昵称最少4位字母数字!");
        if (this.reginNick.length > 12) return this.error("昵称最多12位字母数字!");
        if (!/^[a-zA-Z0-9]+$/.test(this.reginNick)) return this.error("昵称只能是字母数字!");

        if (this.reginPassword.length < 6) return this.error("密码最少6位!");
        if (this.reginNick.length > 18) return this.error("密码最多18位!");

        message.loading("正在玩命奔袭...");

        await new Promise((r, j) => {
            setTimeout(() => {
                r();
            }, 500);
        });

        let response = await Services.regin({
            package_name: Global.packageName,
            os: Global.os,
            uuid: Global.uuid,
            proxy_user_id: Global.params.proxy_user_id,
            unique_id: Global.params.unique_id,
            game_nick: this.reginNick,
            account_pass: this.reginPassword,
            role_name: this.reginAccount
        });

        if (!response.data) return this.error("注册异常,请稍后再试!");

        if (response.data.code !== 200) {
            switch (response.data.code) {
                case 531:
                    return this.error("UUID不能为空!");
                case 532:
                    return this.error("OS不能为空!");
                case 533:
                    return this.error("PACKAGE不能为空!");
                case 534:
                    return this.error("代理CODE不能为空!");
                case 535:
                    return this.error("代理等级不能为空!");
                case 536:
                    return this.error("昵称不能为空!");
                case 537:
                    return this.error("密码不能为空!");
                case 538:
                    return this.error("账号不能为空!");
                case 5311:
                    return this.error("非法字符!");
                case 5312:
                    return this.error("密码过长!");
                case 5313:
                    return this.error("密码过短!");
                case 5319:
                    return this.error("角色名包含非法字符!");
                case 5320:
                    return this.error("角色名太长!");
                case 5321:
                    return this.error("角色名太短!");
                case 201:
                    return this.error("昵称包含非法字符!");
                case 202:
                    return this.error("昵称太长!");
                case 203:
                    return this.error("昵称太短!");
                case 5310:
                    return this.error("昵称已被占用!");
                case 5322:
                    return this.error("账号名已被占用!");
                case 5318:
                    return this.error("您只能注册一个账号!");
                default:
                    return this.error(`账号异常!${response.data.code}`);
            }
        }

        let userInfo = response.data.msg;

        if (!userInfo.account.game.account) userInfo.account.game = { account: {} };

        Storage.setUserInfo(userInfo);

        this.app.login();

        message.destroy();

        message.success("注册成功!");

        this.props.onClose();
    }

    changeRouter() {
        this.setState({ router: this.state.router === "login" ? "regin" : "login" });
    }

    async login() {
        if (this.account.length > 12) return this.error("账号太长!");
        if (this.password.length > 18) return this.error("密码太长!");
        if (!this.account.trim()) return this.error("账号不能为空!");
        if (!this.password.trim()) return this.error("密码不能为空!");
        if (!/^[a-zA-Z0-9]+$/.test(this.account)) return this.error("账号只能是字母数字!");

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

        if (!login.data) return this.error("登录异常,请稍后再试!");

        if (login.data.code !== 200) {
            switch (login.data.code) {
                case 511:
                    return this.error("用户名不能为空!");
                case 512:
                    return this.error("密码不能为空!");
                case 513:
                    return this.error("UUID不能为空!");
                case 520:
                    return this.error("PACKAGE不能为空!");
                case 521:
                    return this.error("OS不能为空!");
                case 523:
                    return this.error("帐号类型无效!");
                case 522:
                    return this.error("渠道组不存在!");
                case 524:
                    return this.error("手机号不存在!");
                case 525: 
                    return this.error("角色名不存在!");
                case 514:
                    return this.error("账号不存在!");
                case 515:
                    return this.error("密码不正确!");
                case 516:
                    return this.error("用户缓存不存在!");
                case 517:
                    return this.error("账号非法!");
                case 519:
                    return this.error("代理缓存不存在!");
                case 518:
                    return this.error("上级代理缓存不存在!");
                default:
                    return this.error(`账号异常!${login.data.code}`);
            }
        }

        let user = login.data.msg;
        
        Storage.setUserInfo(user);

        Storage.setGameAccount(user.account.game.account);

        this.app.login();

        message.destroy();
        
        message.success("登录成功!");
        console.log('代理等级',user.proxy_rule.income)
        this.app.setState({
            userInfo:user
        })
        this.props.onClose();
    }
}
