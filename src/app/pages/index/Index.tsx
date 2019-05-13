import React, { Component } from "react";
import Header from "../../components/header/Header";
import UserTips from "../../components/userTips/UserTips";
import Banner from "../../components/banner/Banner";
import Content from "../../components/content/Content";
import Footer from "../../components/footer/Footer";
import { UserInfo } from "../../interface/User";
import Storage from "../../components/storage/Storage";
import Global from "../../components/global/Global";
import { RouterProps } from "react-router";
import Socket from "lows";

import { Modal, message } from "antd";

type State = { userInfo: UserInfo; isLogin: boolean };

export default class Index extends Component<RouterProps, State> {
    state = {
        userInfo: {
            game_user: {},
            proxy_user: {},
            prev_proxy: {},
            proxy_rule: {},
            account: { game: { account: {} } }
        } as UserInfo,
        isLogin: false
    };

    socket: Socket = new Socket({
        host: Global.hostManager.serverHost,
        heartInterval: 5
    });

    userTips: UserTips | null = null;
    header: Header | null = null;
    content: Content | null = null;

    login() {
        // LOGIN
        let userInfo = Storage.getUserInfo();

        Global.userInfo = userInfo;

        let isLogin = Global.isLogin();

        this.setState({ userInfo: userInfo, isLogin: isLogin }, () => {
            this.state.isLogin && this.webSocketLogin();
        });
    }

    webSocketLogin() {
        this.socket.global = { id: Global.userInfo.game_user.id };
        this.webSocketListen();
        this.socket.start(() => {
            this.socket.emit("/Game/login/login", { pass: Global.userInfo.account.account_base_pass });
        });
    }

    webSocketListen() {
        this.socket.addListener("/Game/login/login", (ws: any, data: any) => {
            console.log(data);
        });

        this.socket.addListener("nologin", (ws: any, data: any) => {
            this.socket.nologin = true;
            this.socket = (null as unknown) as Socket;
            Storage.delUserInfo();
            Modal.warning({
                title: "您的账号已在别处登录!",
                okText: "我知道了",
                onOk: () => {
                    window.location.reload();
                }
            });
        });

        this.socket.addListener("/GameServer/GameUser/loginout", (ws: any, data: any) => {
            this.updateGameUser(data);
        });

        this.socket.addListener("/GameServer/GameUser/login", (ws: any, data: any) => {
            this.updateGameUser(data);
        });

        this.socket.addListener("/GameServer/GameUser/changeGameUserBalance", (ws: any, data: any) => {
            this.updateGameUser(data);
            message.info("你的余额已更新!!!");
        });

        this.socket.addListener("/GameServer/Notice/notice", (ws: any, data: any) => {
            console.log(data);
        });

        this.socket.addListener("/im/message/sendMessage", (ws: any, data: any) => {
            console.log(data);
        });
    }

    updateGameUser(data: any) {
        if (!data && data.code !== 200) return false;

        let gameUser = data.msg.game_user;
        this.state.userInfo.game_user = gameUser;

        if (data.msg.game_id && data.msg.game_account) {
            let gameAccount = data.msg.game_account;
            let gameId = data.msg.game_id;
            this.state.userInfo.account.game.account[gameId] = gameAccount;
        }

        this.setState({ userInfo: this.state.userInfo });
    }

    componentDidMount() {
        this.login();

        window.addEventListener("message", this.onPostMessage.bind(this), false);
    }

    onPostMessage(e: MessageEvent) {
        let m = JSON.parse(e.data);

        switch (m.type) {
            case "__backtohall":
                this.header!.onClose();
                break;
            case "__back":
                this.content!.onClose();
                break;

            case "__progress":
                this.content!.progress!.onProgress(m.data);
                break;
            case "__done":
                this.content!.progress!.close();
                break;
            default:
                break;
        }
    }

    componentWillUnmount() {
        window.removeEventListener("message", this.onPostMessage.bind(this), false);
    }

    render() {
        return (
            <div className="index">
                <UserTips app={this} ref={userTips => (this.userTips = userTips)} />
                <Header app={this} ref={header => (this.header = header)} />
                <Banner />
                <Content app={this} ref={content => (this.content = content)} />
                <Footer />
            </div>
        );
    }
}
