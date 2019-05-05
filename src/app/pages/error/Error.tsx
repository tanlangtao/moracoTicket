import React, { Component } from "react";
import "./error.scss";

type Props = {};
type State = {};

export default class Error extends Component<Props, State> {
    componentDidMount() {}

    render() {
        return (
            <div className="error">
                <div>您请求的页面丢失了...</div>
            </div>
        );
    }
}
