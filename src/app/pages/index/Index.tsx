import React, { Component } from "react";
import Header from "../../components/header/Header";
import {im} from "../../components/header/Header";
import UserTips from "../../components/userTips/UserTips";
import Banner from "../../components/banner/Banner";
import Content from "../../components/content/Content";
// import Footer from "../../components/footer/Footer";
import { UserInfo } from "../../interface/User";
import Storage from "../../components/storage/Storage";
import Global from "../../components/global/Global";
import { RouterProps } from "react-router";
import Socket from "lows";
import Axios from "axios";
import Api from "../../api/Api";
import Qs from "querystring";

import { Modal, message } from "antd";
type State = { userInfo: UserInfo; isLogin: boolean ,news:any};

export default class Index extends Component<RouterProps, State> {
    state = {
        userInfo: {
            game_user: {},
            proxy_user: {},
            prev_proxy: {},
            proxy_rule: {},
            account: { game: { account: {} } }
        } as UserInfo,
        isLogin: false,
        news:''
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
        let self = this;
        this.socket.addListener("/Game/login/login", (ws: any, data: any) => {
            console.log(data);
            self.getNotice();
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
            this.content!.notice!.notice(data.msg);
        });

        this.socket.addListener("/im/message/sendMessage", (ws: any, data: any) => {
            console.log(data);
        });
    }

    updateGameUser(data: any) {
        if (!data && data.code !== 200) return false;

        let gameUser = data.msg.game_user;
        // eslint-disable-next-line
        this.state.userInfo.game_user = gameUser;

        if (data.msg.game_id && data.msg.game_account) {
            let gameAccount = data.msg.game_account;
            let gameId = data.msg.game_id;
            // eslint-disable-next-line
            this.state.userInfo.account.game.account[gameId] = gameAccount;
        }

        this.setState({ userInfo: this.state.userInfo });
    }

    componentDidMount() {
        this.login();

        window.addEventListener("message", this.onPostMessage.bind(this), false);

        //窗口小于1920时，自动滚动至中间
        this.resizeClient()
    }

    resizeClient(){
        window.addEventListener('resize',()=>{
            document.documentElement.scrollTo(430,0);
        })
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
                if(m.data.name === 'pay' || m.data.name === 'IM'){
                }else{
                    this.content!.progress!.close();
                }
                break;
            case "__onim":
                this.header!.onClose();
                let timer = setTimeout(()=>{
                    if(this.header){
                        im(this.header);
                    }
                    clearTimeout(timer)
                },500)
                break;
            default:
                break;
        }
    }

    componentWillUnmount() {
        window.removeEventListener("message", this.onPostMessage.bind(this), false);
    }

    getIconPath() {
        let os = Global.os;

        let packageName = `${Global.packageName}`;

        let pathName = packageName.replace(`.${os}`, "") + "/icon";

        return `${Global.hostManager.sourceHost}/${pathName}/`;
    }

    async getNotice() {
        let now = new Date();

        let time = (now.getTime() / 1000) >> 0;

        let day = 30;

        let data :any= await Axios.post(
            `${Global.hostManager.serverHost}${Api.getNotice}`,
            Qs.stringify({
                id: this.state.userInfo.game_user.id,
                query: JSON.stringify({
                    package_ids: { $elemMatch: { $eq: this.state.userInfo.game_user.package_id } },
                    is_open: 1,
                    start_time: { $lte: time },
                    end_time: { $lte: time + 3600 * 24 * day }
                })
            })
        ).catch(e => console.log(e));
        if (!data.data) return false;
        if (data.data.code !== 200) return false;

        let msgs = data.data.msg;

        let notices :any  = [];

        let sliders :any = [];

        msgs.forEach((e:any, i:number) => {
            let notice = {
                key:0,
                isShow:0,
                type:'123',
                title:'',
                words:{}
            };

            notice.key = i;
            notice.isShow = 0;
            notice.type = e.type;
            notice.title = e.title;
            notice.words = e.words;

            notices.push(notice);

            if (e.is_slider === 1) {
                let noticeVal = `${e.title}:${e.words}`;
                sliders.push({
                    type: 1, // 1 系统 2 游戏
                    notice: noticeVal.replace(/\s+/g,"")
                });
            }
        });
        this.header!.newsMessage!.setState({ news: notices });

        sliders.forEach((e:any)=> {
            this.content!.notice!.notice(e);
        });
    }

    render() {
        return (
            <div className="index">
                <UserTips app={this} ref={userTips => (this.userTips = userTips)} />
                <Header app={this} ref={header => (this.header = header)} />
                <Banner app={this} />
                <Content app={this} ref={content => (this.content = content)} />
                {/* <Footer /> */}
            </div>
        );
    }
}
