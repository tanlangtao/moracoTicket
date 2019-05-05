import React, { Component } from "react";
import { Modal } from "antd";

type Props = {
    src?: string;
    title?: string;
    className?: string;
    style?: {};
    width?: number;
    height?: number;
};

type State = {
    visible: boolean;
};

export default class Iframe extends Component<Props, State> {
    state = {
        visible: false
    };

    onClose() {
        this.setState({ visible: false });
    }

    onOpen() {
        this.setState({ visible: true });
    }

    src = "/";

    render() {
        return (
            <Modal
                visible={this.state.visible}
                width={this.props.width}
                footer={null}
                destroyOnClose={true}
                onCancel={() => this.onClose()}
                bodyStyle={{ padding: 0 }}
                closable={false}
                maskClosable={false}
            >
                <iframe
                    src={this.props.src || this.src}
                    className={this.props.className}
                    title={this.props.title}
                    style={Object.assign(this.props.style, {
                        padding: 0,
                        margin: 0,
                        border: "none",
                        overflow: "hidden",
                        height: this.props.height + "px",
                        width: this.props.width + "px"
                    })}
                />
            </Modal>
        );
    }
}
