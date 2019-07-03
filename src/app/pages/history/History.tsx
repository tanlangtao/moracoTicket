import React, { Component } from "react";
import Header from "../../components/header/Header";
import Banner from "../../components/banner/Banner";
import HistoryContent from "../../components/content/HistoryContent";
import Footer from "../../components/footer/Footer";

type Props = {};
type State = {};

export default class History extends Component<Props, State> {
    
   
    render() {
        return (
            <div className="index">
                <Header app={this}  />
                <Banner app={this} />
                <HistoryContent  />
                <Footer top='1000px'/>  
            </div>
        );
    }
}
