import React, { Component, MouseEvent } from "react";
import "./header.scss";
import Icon from "../small/Icon";
import Index from "../../pages/index/Index";
import Global from "../global/Global";
import { Modal } from "antd";
import NewsMessage from '../newsMessage/NewsMessage';
type Props = {
    app: Index;
};

type State = {
    select: string;
    visible: boolean;
    income :number;
};

const width = 736 * 1.3;
const height = 414 * 1.4;
export default class Header extends Component<Props, State> {
    // APP
    app = this.props.app;
    newsMessage!: NewsMessage | null;
    state = {
        visible: false,
        select: "游戏大厅",
        income:0
    };
    iconPath =''
    // TITLES
    navs =
        this.app.state.userInfo.proxy_rule.income === 0
            ? {
                  游戏大厅: () => gameHall(),
                  消息: () => news(this.newsMessage!),
                  宝友: () => im(this),
                  兑换: () => topDown(this),
                  活动: () => activity(this),
                  充值: () => topUp(this),
                  交易所: () => house(this),
              }
            : {
                  游戏大厅: () => gameHall(),
                  消息: () => news(this.newsMessage!),
                  宝友: () => im(this),
                  兑换: () => topDown(this),
                  活动: ()=>activity(this),
                  充值: () => topUp(this),
                  交易所: () => house(this),
                  代理: () => proxy(this)
              };
    
    iframe = { width: 0, src: "", className: "", height: 0, style: {}, title: "" ,border:1 };

    onClose() {
        this.setState({ visible: false });
    }

    onOpen() {
        this.setState({ visible: true });
    }

    navsClick(e: MouseEvent, select: string) {
        if (select !== "游戏大厅") {
            if (!Global.isLogin()) {
                return this.app.userTips!.login();
            }
        }
        this.setState({ select: select });
        (this.navs as any)[select]();
    }

    componentDidMount(){
        this.iconPath = this.app.getIconPath();
    }
    shouldComponentUpdate(){
        if(this.app.state.userInfo.proxy_rule){
            return true;
        }else{
            return false;
        }
        
    }
    render() {
        //显示代理
            this.navs =this.app.state.userInfo.proxy_rule.income === 0
                ? {
                      游戏大厅: () => gameHall(),
                      消息: () => news(this.newsMessage!),
                      宝友: () => im(this),
                      兑换: () => topDown(this),
                      活动: ()=>activity(this),
                      充值: () => topUp(this),
                      交易所: () => house(this)
                  }
                : {
                      游戏大厅: () => gameHall(),
                      消息: () => news(this.newsMessage!),
                      宝友: () => im(this),
                      兑换: () => topDown(this),
                      活动: ()=>activity(this),
                      充值: () => topUp(this),
                      交易所: () => house(this),
                      代理: () => proxy(this)
                  };
        
        let navsComponent = Object.keys(this.navs).map((e, i) => (
            <div key={i} onClick={(ev: MouseEvent) => this.navsClick(ev, e)} className={e === this.state.select ? "nav-index" : ""}>
                {e}
            </div>
        ));

        return (
            <div className="header">
                <div className="header-bg" ></div>
                {/* <Icon className="header-bg" src={require("../../../assets/hall/nav_back_bg_fd2505e.jpg")} /> */}
               <div className='content2'>
                    <div className="list">
                        <div className="left">
                            <Icon className="left-icon" src={require("../../../assets/hall/new_icon.24b9ee17.png")} />
                        </div>
                        <div className="right">{navsComponent}</div>
                    </div>

                    <Modal
                        visible={this.state.visible}
                        width={this.iframe.width}
                        footer={null}
                        destroyOnClose={true}
                        // onCancel={() => this.onClose()}
                        bodyStyle={{ 
                            background:`black url(${this.iframe.border===1?require('../../../assets/game/imBorder.png'):require('../../../assets/game/youxikuang.png')})`,
                            backgroundSize:'100% 100%',
                            backgroundRepeat :'no-repeat',
                            height: this.iframe.height,
                            width: this.iframe.width,
                            maxHeight: "80vh",
                            maxWidth: "80vw",
                            padding: this.iframe.border===1 ? '10px 15px 10px 10px':'35px 15px 35px 20px',
                            margin: 0, 
                            minWidth:this.iframe.width,
                            minHeight:this.iframe.height
                        }}
                            closable={false}
                            maskClosable={false}
                            maskStyle={{background:`url(${require('../../../assets/hall/huabeijing.jpg')})` ,
                     }}
                    >   
                            <iframe
                                src={this.iframe.src}
                                className={this.iframe.className}
                                title={this.iframe.title}
                                style={Object.assign(
                                    {
                                        padding: 0,
                                        margin: 'auto',
                                        border: "none",
                                        overflow: "hidden",
                                        height:  this.iframe.border===1  ?this.iframe.height-30 :this.iframe.height-80,
                                        width: this.iframe.border===1  ? this.iframe.width-20 :this.iframe.width-40,
                                        maxHeight: "80vh",
                                        maxWidth: "80vw",
                                        minWidth:this.iframe.border===1  ? this.iframe.width-20 :this.iframe.width-40,
                                        minHeight:this.iframe.border===1  ?this.iframe.height-20 :this.iframe.height-80
                                    },
                                    this.iframe.style
                                )}
                            />
                    
                        <div className="position-bottom" onClick={() => this.onClose()}>
                        
                        </div>
                    </Modal>
                    <NewsMessage app={this.app} ref={newsMessage => (this.newsMessage = newsMessage)}/>
               </div>
            </div>
        );
    }
}

const gameHall = () => {
    console.log("game-hall");
};

const news = (newsMessage: NewsMessage ) => {
    newsMessage.onOpen()
};

const im = (app: Header) => {
    let url = Global.package.desktop.im_down_url;
    // url = "http://127.0.0.1:4200";
    let src =
        `${url}` +
        `?version=${Global.package.desktop.im_version}` +
        `&host=${Global.hostManager.imHost}` +
        `&iconPath=${app.iconPath}` +
        `&package_id=${Global.package.id}` +
        `&os=${Global.os}` +
        `&account_name=${Global.userInfo.game_user.id}` +
        `&account_pass=${Global.userInfo.account.account_base_pass}` +
        `&env=${Global.mode}` +
        `&time=${Date.now()}`;

    app.iframe.height = 715;
    app.iframe.width = 414;
    
    app.iframe.title = "im";
    app.iframe.src = src;
    app.iframe.className = "iframe";
    app.iframe.border = 1
    app.onOpen();
};

const proxy = (app: Header) => {
    let url = Global.package.desktop.proxy_down_url;
    // url = "http://127.0.0.1:4200";

    let src =
        `${url}` +
        `?version=${Global.package.desktop.proxy_version}` +
        `&host=${Global.hostManager.proxyHost}` +
        `&os=${Global.os}` +
        `&account_name=${Global.userInfo.game_user.id}` +
        `&account_pass=${Global.userInfo.account.account_base_pass}` +
        `&package_id=${Global.userInfo.game_user.package_id}` +
        `&env=${Global.mode}` +
        `&time=${Date.now()}`;

    app.iframe.height = 695;
    app.iframe.width = 414;
    app.iframe.title = "proxy";
    app.iframe.src = src;
    app.iframe.className = "iframe";
    app.iframe.border = 1
    app.onOpen();
};

const topDown = (app: Header) => {
    let url = Global.package.desktop.pay_down_url;
    // url = "http://127.0.0.1:7456";

    let src =
        `${url}` +
        `?version=${Global.package.desktop.pay_version}` +
        `&host=${Global.hostManager.payHost}` +
        `&imHost=${Global.hostManager.imHost}` +
        `&client=${Global.os}` +
        `&user_id=${Global.userInfo.game_user.id}` +
        `&user_name=${Global.userInfo.game_user.game_nick}` +
        `&proxy_user_id=${Global.userInfo.prev_proxy.id}` +
        `&proxy_name=${Global.userInfo.prev_proxy.proxy_nick}` +
        `&package_id=${Global.userInfo.game_user.package_id}` +
        `&path=${"/cash"}` +
        `&env=${Global.mode}` +
        `&time=${Date.now()}`;

    app.iframe.height = height;
    app.iframe.width = width;
    app.iframe.title = "topdown";
    app.iframe.src = src;
    app.iframe.className = "iframe";
    app.iframe.border = 2
    app.onOpen();
};

const topUp = (app: Header) => {
    let url = Global.package.desktop.pay_down_url;
    // url = "http://127.0.0.1:7456";

    let src =
        `${url}` +
        `?version=${Global.package.desktop.pay_version}` +
        `&host=${Global.hostManager.payHost}` +
        `&imHost=${Global.hostManager.imHost}` +
        `&client=${Global.os}` +
        `&user_id=${Global.userInfo.game_user.id}` +
        `&user_name=${Global.userInfo.game_user.game_nick}` +
        `&proxy_user_id=${Global.userInfo.prev_proxy.id}` +
        `&proxy_name=${Global.userInfo.prev_proxy.proxy_nick}` +
        `&package_id=${Global.userInfo.game_user.package_id}` +
        `&path=${"/"}` +
        `&env=${Global.mode}` +
        `&time=${Date.now()}`;

    app.iframe.height = height;
    app.iframe.width = width;
    app.iframe.title = "topdown";
    app.iframe.src = src;
    app.iframe.className = "iframe";
    app.iframe.border = 2
    app.onOpen();
};

const house = (app: Header) => {
    let url = Global.package.desktop.house_down_url;
    // url = "http://127.0.0.1:7457";
    let src =
        `${url}` +
        `?version=${Global.package.desktop.house_version}` +
        `&host=${Global.hostManager.payHost}` +
        `&imHost=${Global.hostManager.imHost}` +
        `&client=${Global.os}` +
        `&user_id=${Global.userInfo.game_user.id}` +
        `&user_name=${Global.userInfo.game_user.game_nick}` +
        `&proxy_user_id=${Global.userInfo.prev_proxy.id}` +
        `&proxy_name=${Global.userInfo.prev_proxy.proxy_nick}` +
        `&package_id=${Global.userInfo.game_user.package_id}` +
        `&path=${"/"}` +
        `&env=${Global.mode}` +
        `&time=${Date.now()}`;
    app.iframe.height = height;
    app.iframe.width = width;
    app.iframe.title = "topdown";
    app.iframe.src = src;
    app.iframe.className = "iframe";
    app.iframe.border = 2
    app.onOpen();
};
const activity = (app: Header) => {
    let url = Global.package.desktop.pay_down_url;
    let src =
        `${url}` +
        `?version=${Global.package.desktop.pay_version}` +
        `&host=${Global.hostManager.payHost}` +
        `&client=${Global.os}` +
        `&user_id=${Global.userInfo.game_user.id}` +
        `&user_name=${Global.userInfo.game_user.game_nick}` +
        `&proxy_user_id=${Global.userInfo.prev_proxy.id}` +
        `&proxy_name=${Global.userInfo.prev_proxy.proxy_nick}` +
        `&package_id=${Global.userInfo.game_user.package_id}` +
        `&path=${"/activity"}` +
        `&env=${Global.mode}` +
        `&time=${Date.now()}`;

    app.iframe.height = height;
    app.iframe.width = width;
    app.iframe.title = "topdown";
    app.iframe.src = src;
    app.iframe.className = "iframe";
    app.iframe.border = 2
    app.onOpen();
};
export {im,topUp,topDown,house};
