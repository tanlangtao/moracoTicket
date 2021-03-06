import React, { Component } from "react";
import Header from "../../components/header/Header";
import Banner from "../../components/banner/Banner";
import Content from "../../components/content/Content";
import Footer from "../../components/footer/Footer";
import { RouterProps } from "react-router";

type State = {};

export default class Index extends Component<RouterProps, State> {

    render() {
        return (
            <div className="index">
                <Header app={this} />
                <Banner app={this} />
                <Content app={this} />
                <Footer top='1550px'/>  
            </div>
        );
    }
}
