import React, { Component } from "react";

import "./content.scss";
import Icon from "../small/Icon";
import { Modal, message } from "antd";
import Global from "../global/Global";
import Index from "../../pages/index/Index";
import { Game } from "../../interface/GameList";
import Progress from "../progress/Progress";
import Services from "../../services/Services";
import Storage from "../storage/Storage";
import RightFixed from '../rightfixed/RightFixed';
import Bottom from "../small/Bottom";
type Props = { app: Index };
type State = { visible: boolean };

export default class Content extends Component<Props, State> {
    state = {
        visible: false,
    };

    app = this.props.app;

    currentGame: Game | null = null;

    iframe = { width: 0, src: "", className: "", height: 0, style: {}, title: "" ,border :2};

    progress!: Progress | null;

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

        // CHECK IF NOT HAS ACCOUNT
        if (!this.app.state.userInfo.account.game.account) this.app.state.userInfo.account.game.account = {};

        if (!this.app.state.userInfo.account.game.account[game.game_id]) {
            this.createGameAccount(game);
        } else {
            this.gameStart(game);
        }
    }
    gameStart(game: Game) {
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
        if(game.game_name === '红包扫雷'){
            this.iframe.border = 1;
            this.iframe.height = 695;
            this.iframe.width = 414;
        }else{
            this.iframe.border = 2;
            this.iframe.height = game.height;
            this.iframe.width = game.width;
        }
        this.iframe.title = "proxy";
        this.iframe.src = src;
        this.iframe.className = "iframe";
        
        console.log(src);

        this.onOpen();
    }

    error(msg: string) {
        return message.error(msg);
    }

    async createGameAccount(game: Game) {
        message.loading(`正在创建 ${game.game_name} 账号...`);

        let response = await Services.createGameAccount({
            game_id: game.game_id,
            balance: 0,
            id: this.app.state.userInfo.game_user.id,
            package_id: this.app.state.userInfo.game_user.package_id
        });

        if (response.data.code !== 200) return this.error(`创建账号失败 ${response.data.code}`);

        let gameAccountList = this.app.state.userInfo.account.game.account;
        let newGameAccountList = { ...gameAccountList, ...response.data.msg };
        this.app.state.userInfo.account.game.account = newGameAccountList;

        Storage.setUserInfo(this.app.state.userInfo);

        this.app.setState({ userInfo: this.app.state.userInfo }, () => {
            message.destroy();
            message.success("创建成功!");
            this.gameStart(game);
        });

        console.log(game);
    }
    render() {
        console.log(Global.gameList);
        // let game_type_2 = Global.gameList
        //     .filter(e => e.type === 2)
        //     .map((e, i) => (
        //         <div onClick={() => this.onGame(e)} key={i}>
        //             <Icon src={e.web_game_img} className="game" />
        //         </div>
        //     ));
        let game_type_1 = Global.gameList.sort((a, b) => b.sort - a.sort).map((e, i) => (
                <div onClick={() => this.onGame(e)} key={i}>
                    <Icon src={e.web_game_img} className="game" />
                </div>
            ));
        return (
            <div className="content">
                <RightFixed app={this.app}/>
                <div className = 'innerContent'>
                <div className="top">
                    <Icon src={require("../../../assets/hall/icon_SE.png")} />
                    <div className="title">更新啦！</div>
                </div>

                <div className="browser">
                    {/* <Icon src={require("../../../assets/hall/new_icon.24liulanqie16.png")} className="browser-img" /> */}
                </div>
                <div className="middle">
                    <div className='left-tip' id = 'left-tip' 
                        onMouseDown={this.leftBtnStyle.bind(this)}
                        onMouseUp={this.leftBtnStyle.bind(this)}
                        onClick ={this.pageUp.bind(this)}
                    >
                        <Icon src={require("../../../assets/hall/game_l.png")} className="browser-img" /> 
                    </div>
                    <div className = 'game-scroll'>
                        <div className="game-list" id='game-list'>{game_type_1}</div>
                    </div>
                    <div className='right-tip'id = 'right-tip' 
                        onMouseDown={this.rightBtnStyle.bind(this)} 
                        onMouseUp={this.rightBtnStyle.bind(this)}
                        onClick ={this.pageDown.bind(this)}
                        >
                        <Icon src={require("../../../assets/hall/game_r.png")} className="browser-img" /> 
                    </div>
                </div>
                </div>
                <Modal
                    visible={this.state.visible}
                    width={this.iframe.width + "px"}
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
                        padding: this.iframe.border===1 ? '15px 10px 15px 10px':'40px 25px 43px 23px',
                        margin: 0 ,
                    }}
                    closable={false}
                    maskClosable={false}
                    maskStyle={{background:`url(${require('../../../assets/hall/huabeijing.jpg')})` }}
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
                                height:  this.iframe.border===1  ?this.iframe.height-30+"px" :this.iframe.height-121+"px",
                                width:  this.iframe.border===1  ?this.iframe.width-20+"px" :this.iframe.width-48+"px",
                                maxHeight: "80vh",
                                maxWidth: "80vw"
                            },
                            this.iframe.style
                        )}
                    />
                    <Progress ref={progress => (this.progress = progress)} />

                    <div className="position-bottom" onClick={() => this.onClose()}>
                        {/* <Button type="primary" ghost onClick={() => this.randomGame()}>
                            下一个游戏
                        </Button> */}
                    </div>
                </Modal>
                <Bottom />
            </div>
        );
    }
    leftBtnStyle(){
        let Btn = document.getElementById('left-tip');
        if(Btn){
            if( Btn.style.transform === 'scale(0.9)'){
                Btn.style.transform = 'scale(1)'
            }else{
                Btn.style.transform = 'scale(0.9)'
            }
            
        }
    }

    rightBtnStyle(){
        let Btn= document.getElementById('right-tip');
        if(Btn){
            if( Btn.style.transform === 'scale(0.9)'){
                Btn.style.transform = 'scale(1)'
            }else{
                Btn.style.transform = 'scale(0.9)'
            }
            
        }
    }

    pageUp(){
        let gameList = document.getElementById('game-list');
        if(gameList){
               
                if(gameList.style.left === '-880px'){
                    gameList.style.left = `0px`;
                    gameList.style.transition ='left 1s';
                }
        }
    }

    pageDown(){
        let gameList = document.getElementById('game-list');
        if(gameList){
            gameList.style.left = `-880px`;
            gameList.style.transition ='left 1s';
        }
    }
}
