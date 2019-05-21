import React, { Component, MouseEvent } from "react";
import "./header.scss";
import Icon from "../small/Icon";
import Index from "../../pages/index/Index";
import Global from "../global/Global";
import { Modal } from "antd";

type Props = {
    app: Index;
};

type State = {
    select: string;
    visible: boolean;
};

const width = 736 * 1.3;
const height = 414 * 1.3;

export default class Header extends Component<Props, State> {
    // APP
    app = this.props.app;

    // TITLES
    navs =
        this.app.state.userInfo.proxy_rule.income === 0
            ? {
                  游戏大厅: () => gameHall(),
                  消息: () => news(this),
                  宝友: () => im(this),
                  兑换: () => topDown(this),
                  充值: () => topUp(this)
              }
            : {
                  游戏大厅: () => gameHall(),
                  消息: () => news(this),
                  宝友: () => im(this),
                  兑换: () => topDown(this),
                  充值: () => topUp(this),
                  代理: () => proxy(this)
              };

    state = {
        visible: false,
        select: "游戏大厅"
    };

    iframe = { width: 0, src: "", className: "", height: 0, style: {}, title: "" };

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

    render() {
        let navsComponent = Object.keys(this.navs).map((e, i) => (
            <div key={i} onClick={(ev: MouseEvent) => this.navsClick(ev, e)} className={e === this.state.select ? "nav-index" : ""}>
                {e}
            </div>
        ));

        return (
            <div className="header">
                <Icon className="header-bg" src={require("../../../assets/hall/nav_back_bg_fd2505e.jpg")} />
               <div className='content'>
               <Icon className="header-bg" src={require("../../../assets/hall/nav_back_bg_fd2505e.jpg")} />
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
                        bodyStyle={{ padding: 0, margin: 0, height: this.iframe.height, maxHeight: "80vh", maxWidth: "80vw" }}
                        closable={false}
                        maskClosable={false}
                    >
                        <iframe
                            src={this.iframe.src}
                            className={this.iframe.className}
                            title={this.iframe.title}
                            style={Object.assign(
                                {
                                    padding: 0,
                                    margin: 0,
                                    border: "none",
                                    overflow: "hidden",
                                    height: this.iframe.height,
                                    width: this.iframe.width,
                                    maxHeight: "80vh",
                                    maxWidth: "80vw"
                                },
                                this.iframe.style
                            )}
                        />
                    </Modal>
               </div>
            </div>
        );
    }
}

const gameHall = () => {
    console.log("game-hall");
};

const news = (app: Header) => {
    console.log("news");
};

const im = (app: Header) => {
    let url = Global.package.desktop.im_down_url;
    // url = "http://127.0.0.1:4200";

    let src =
        `${url}` +
        `?version=${Global.package.desktop.im_version}` +
        `&host=${Global.hostManager.imHost}` +
        `&package_id=${Global.package.id}` +
        `&os=${Global.os}` +
        `&account_name=${Global.userInfo.game_user.id}` +
        `&account_pass=${Global.userInfo.account.account_base_pass}` +
        `&env=${Global.mode}` +
        `&time=${Date.now()}`;

    app.iframe.height = width;
    app.iframe.width = height;
    app.iframe.title = "im";
    app.iframe.src = src;
    app.iframe.className = "iframe";

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

    app.iframe.height = width;
    app.iframe.width = height;
    app.iframe.title = "proxy";
    app.iframe.src = src;
    app.iframe.className = "iframe";

    app.onOpen();
};

const topDown = (app: Header) => {
    let url = Global.package.desktop.pay_down_url;
    // url = "http://10.63.58.18:7456";

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
        `&path=${"/cash"}` +
        `&env=${Global.mode}` +
        `&time=${Date.now()}`;

    app.iframe.height = height;
    app.iframe.width = width;
    app.iframe.title = "topdown";
    app.iframe.src = src;
    app.iframe.className = "iframe";

    app.onOpen();
};

const topUp = (app: Header) => {
    let url = Global.package.desktop.pay_down_url;
    // url = "http://10.63.58.18:7456";

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
        `&path=${"/"}` +
        `&env=${Global.mode}` +
        `&time=${Date.now()}`;

    app.iframe.height = height;
    app.iframe.width = width;
    app.iframe.title = "topdown";
    app.iframe.src = src;
    app.iframe.className = "iframe";

    app.onOpen();
};
