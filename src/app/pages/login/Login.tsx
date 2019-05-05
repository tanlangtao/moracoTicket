import React, { Component } from "react";

type Props = {};
type State = {};

export default class Login extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        console.log(1);
    }

    state = {};

    render() {
        return <div>login</div>;
    }
}
