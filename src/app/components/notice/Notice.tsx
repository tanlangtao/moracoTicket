import React, { Component } from "react";
import Index from "../../pages/index/Index";
import "./notice.scss";
type Props = {
    app: Index;
};

type State = {
    msg: string;
};
export default class  Notice extends Component<Props, State> {
    state = {
        msg: ""
    };

    message :any = [];

    msg :any = {};

    slider :any = {};

    boxWidth = 0;

    index = 0;

    isRun = false;

    notice(data:any) {
        if (!data) return false;
        if (!data.type) return false;
        if (!data.notice) return false;
        this.message.push(data);
        if (!this.isRun) this.run();
    }

    end() {
        if (this.message[this.index].type === 2) {
            this.message.splice(this.index, 1);
        }

        this.index++;
        if (this.index > this.message.length - 1) {
            this.index = 0;
        }

        if (this.message.length <= 0) {
            this.isRun = false;
            this.index = 0;
            return false;
        }

        this.setState({ msg: this.message[this.index].notice }, () => {
            this.start();
        });
    }

    run() {
        if (this.message.length > 0) {
            this.setState({ msg: this.message[this.index].notice }, () => {
                this.boxWidth = this.slider.offsetWidth;
                this.isRun = true;
                this.start();
            });
        }
    }

    start() {
        let maxWidth = this.msg.offsetWidth;
        let left = this.boxWidth;
        this.msg.style.left = left + "px";
        let fn = () => {
            window.requestAnimationFrame(() => {
                left -= 0.8;
                this.msg.style.left = left + "px";
                if (left < -maxWidth - 20) {
                    this.end();
                } else {
                    fn();
                }
            });
        };
        fn();
    }

    componentDidMount() {
        this.run();
    }

    render() {
        return (
            <div
                className="notice"
                style={{
                    width: "100%",
                    margin: "0 auto"
                }}
            >
                <div>
                    <div className="tip">
                        <div className="slider" ref={e => (this.slider = e)}>
                            <div ref={e => (this.msg = e)}>{this.state.msg}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
