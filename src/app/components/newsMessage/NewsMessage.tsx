import React, { Component } from "react";
import "./newsMessage.scss";
import Index from "../../pages/index/Index";
import { Modal } from "antd";
import Icon from "../small/Icon";
type Props = {
    app: Index;
};

type State = {
    visible: boolean;
    news:any;
};

const width = 736 ;
const height = 414 ;
export default class NewsMessage extends Component<Props, State> {
    // APP
    app = this.props.app;
    state = {
        visible: false,
        news:[],
    }
    
    iframe = { width: width, src: "", className: "", height: height, style: {}, title: "" ,border:1 };
    onClose() {
        this.setState({ visible: false });
    }

    onOpen() {
        this.setState({ visible: true });
    }

    listShow(key:any) {
        this.state.news.map((e:any) => {
            if (e.key !== key) {
                e.isShow = 0
            }
            return e
        })

        let current :any = this.state.news.find((e:any) => e.key === key)

        current.isShow = !current.isShow

        this.setState({ news: this.state.news }, () => {
            this.getList();
        })
    }

    getList() {
        return this.state.news.map((e:any, i) => {
            return (
                <div className="list" key={i} style={{ height: `${!e.isShow ? '30px' : '100%'}` }}>
                    <div className="title">
                        <div className="icon"  onClick={() => this.listShow(e.key)}>
                            <img src={require('../../../assets/game/img_jiantou.png')} alt={""} style={{ 'transform': `rotate(${!e.isShow ? '-90deg' : '0deg'})` }} />
                        </div>
                        <pre onClick={() => this.listShow(e.key)}>{e.title}</pre>
                    </div>
                    <div className="words">
                        <pre>{e.words}</pre>
                    </div>
                </div>
            )
        })
    }
    render() {
        return (
            <div className="news-header">
                    <Modal
                        visible={this.state.visible}
                        width={this.iframe.width}
                        footer={null}
                        destroyOnClose={true}
                        bodyStyle={{ 
                            height: this.iframe.height,
                            width: this.iframe.width,
                            maxHeight: "100vh",
                            maxWidth: "100vw",
                            padding: this.iframe.border===1 ? '15px 10px 15px 10px':'35px 15px 35px 20px',
                            margin: 0, 
                            marginTop:100,
                        }}
                        closable={false}
                        maskClosable={false}
                    >   
                        <div >
                            <Icon className="news-body" src={require("../../../assets/game/gonggaopai.png")} />
                            <div className="news-body" >
                                <Icon className="news-title" src={require("../../../assets/game/gonggao1.png")} />
                                <div className="news-content">
                                    <div className="middle">
                                        <div className="box">
                                            <div className="scroll">{this.getList()}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="news-right"/>
                            </div>
                        </div>
                        <div className="news-bottom" onClick={() => this.onClose()}>
                        
                        </div>
                    </Modal>
               </div>
        );
    }
}
