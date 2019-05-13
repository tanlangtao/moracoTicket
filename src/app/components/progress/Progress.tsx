import React, { Component } from "react";
import "./progress.scss";

type Props = {};

type State = {
    show: boolean;
    progress: number;
};

export default class Progress extends Component<Props, State> {
    state = {
        show: true,
        progress: 0
    };

    render() {
        return this.state.show ? (
            <div className="progress">
                <div className="progress-title">正在载入游戏,请稍后...</div>
                <div className="progress-number">已完成 {this.state.progress} %</div>
            </div>
        ) : null;
    }

    close() {
        this.setState({ show: false });
    }

    open() {
        this.setState({ show: true });
    }

    onProgress(progress: any) {
        let p = ((progress.current / progress.total) * 100).toFixed(1);

        this.setState({ progress: parseFloat(p) });
    }
}
