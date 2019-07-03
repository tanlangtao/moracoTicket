import React, { Component } from "react";
import "./App.scss";
import Index from "./pages/index/Index";
import History from "./pages/history/History";
import { HashRouter, Switch, Route, } from "react-router-dom";
class App extends Component {
    componentDidMount(){
        window.resizeTo(1000,500)
    }
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/" component={Index} exact />
                    <Route path="/history" component={History} exact />
                    {/* <Redirect from="**" to="/index" /> */}
                </Switch>
            </HashRouter>
        );
    }
}

export default App;
