import React, { Component } from "react";

import "./content.scss";
import Icon from "../small/Icon";
import { Modal, Button } from "antd";
import Global from "../global/Global";
import Index from "../../pages/index/Index";
import { Game } from "../../interface/GameList";

type Props = { app: Index };
type State = { visible: boolean };

const width = 736 * 1.5;
const height = 414 * 1.5;

export default class Content extends Component<Props, State> {
    state = {
        visible: false
    };

    app = this.props.app;

    currentGame: Game | null = null;

    iframe = { width: 0, src: "", className: "", height: 0, style: {}, title: "" };

    onClose() {
        this.setState({ visible: false });
    }

    onOpen() {
        this.setState({ visible: true });
    }

    randomGame() {
        if (!this.currentGame) return;

        let randomGames = Global.gameList.filter(e => e._id !== this.currentGame!._id);

        this.onClose();

        let t = (Date.now() / 1000) >> 0;
        this.onGame(randomGames[t % randomGames.length]);
    }

    onGame(game: Game) {
        // CHECK IF NOT LOGIN
        if (!Global.isLogin()) {
            return this.app.userTips!.login();
        }

        this.currentGame = game;

        let serverURL = game!.game_host[0];

        let info = btoa(
            JSON.stringify({
                id: Global.userInfo.game_user.id,
                game_id: game!.game_id,
                server_url: serverURL
            })
        );

        let src =
            `${game!.web_down_webgl}` +
            `?info=${info}` +
            `&os=${Global.os}` +
            `&package_id=${Global.userInfo.game_user.package_id}` +
            `&version=${game!.version}` +
            `&env=${Global.mode}` +
            `&time=${Date.now()}`;

        this.iframe.height = height;
        this.iframe.width = width;
        this.iframe.title = "proxy";
        this.iframe.src = src;
        this.iframe.className = "iframe";

        console.log(src);

        this.onOpen();
    }

    render() {
        let game_type_2 = Global.gameList
            .filter(e => e.type === 2)
            .map((e, i) => (
                <div onClick={() => this.onGame(e)} key={i}>
                    <Icon src={e.web_game_img} className="game" />
                </div>
            ));
        let game_type_1 = Global.gameList
            .filter(e => e.type === 1)
            .map((e, i) => (
                <div onClick={() => this.onGame(e)} key={i}>
                    <Icon src={e.web_game_img} className="game" />
                </div>
            ));
        return (
            <div className="content">
                <div className="top">
                    <Icon src={require("../../../assets/hall/icon_SE.png")} />
                    <div className="title">更新啦</div>
                </div>

                <div className="browser">
                    <Icon src={require("../../../assets/hall/new_icon.24liulanqie16.png")} className="browser-img" />
                </div>

                <div className="middle">
                    <div className="normal-game">
                        <div className="game-tips">
                            <Icon src={require("../../../assets/hall/icon_h.png")} className="normal-game-icon-left" />
                            <Icon src={require("../../../assets/hall/txt_TG.png")} className="normal-game-icon-right" />
                        </div>

                        <div className="game-list">{game_type_2}</div>
                    </div>
                    <div className="source-game">
                        <div className="game-tips">
                            <Icon src={require("../../../assets/hall/icon_jr.png")} className="normal-game-icon-left" />
                            <Icon src={require("../../../assets/hall/txt_jjj.png")} className="normal-game-icon-right" />
                        </div>

                        <div className="game-list">{game_type_1}</div>
                    </div>

                    <div className="source-show">
                        <div className="game-tips">
                            <Icon src={require("../../../assets/hall/icon_jb.png")} className="normal-game-icon-left" />
                            <Icon src={require("../../../assets/hall/txt_ppp.png")} className="normal-game-icon-right" />
                        </div>

                        <div className="game-list">
                            <div>
                                <Icon src={require("../../../assets/hall/new_icon.24tengxun15-2.png")} className="game" />
                            </div>
                            <div>
                                <Icon src={require("../../../assets/hall/new_icon.2feitingee15-2.png")} className="game" />
                            </div>
                            <div>
                                <Icon src={require("../../../assets/hall/new_icon.2jianada15-2.png")} className="game" />
                            </div>
                            <div>
                                <Icon src={require("../../../assets/hall/new_icon.2zhongqiee15-2.png")} className="game" />
                            </div>
                            <div>
                                <Icon src={require("../../../assets/hall/new_icon.2moluogee15-2.png")} className="game" />
                            </div>
                            <div>
                                <Icon src={require("../../../assets/hall/new_icon.24henei115-2.png")} className="game" />
                            </div>
                            <div>
                                <Icon src={require("../../../assets/hall/new_icon.24heneie15-2.png")} className="game" />
                            </div>
                        </div>
                    </div>
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
                        // allow="autoplay"
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

                    {/* <div className="position-bottom">
                        <Button type="primary" ghost onClick={() => this.randomGame()}>
                            下一个游戏
                        </Button>
                        <Button type="danger" ghost onClick={() => this.onClose()}>
                            关闭游戏
                        </Button>
                    </div> */}
                </Modal>
            </div>
        );
    }
}
