import React, { Component } from "react";
import "./App.scss";
import Index from "./pages/index/Index";
import Login from "./pages/login/Login";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import Global from "./components/global/Global";

import Error from "./pages/error/Error";
import { parseURL } from "./lib/Lib";
import { Params } from "./interface/Params";
import Axios from "axios";
import Storage from "./components/storage/Storage";
import { Package } from "./interface/Package";

class App extends Component {
    state = {
        ready: false
    };

    componentWillMount() {
        // ERROR
        if (window.location.hash === "#/error") return this.ready();

        // PARSE URL
        let info = parseURL();
        console.log(info);
        if (info === false) return this.error();

        // ENTRY INFO
        let params: Params = info.params as Params;
        let packageInfo: Package = info.packageInfo as Package;
        let token: string = info.token;

        this.getPackage(params, packageInfo, token);

        this.getGameList();
    }

    async getGameList() {
        // GET GAME LIST
        let gameList = await this.get(Global.hostManager.serverHost + Global.package.get_game_list, {
            token: Global.token,
            package_id: Global.params.package_id
        });
        if (!gameList.data || gameList.data.code !== 200) {
            return this.error();
        }

        // SET GAME LIST
        Global.gameList = gameList.data.msg;

        // SHOW APP
        this.ready();
    }

    getPackage(params: Params, packageInfo: Package, token: string) {
        // SYSTEMS INFO

        Global.token = token;

        Global.os = "desktop";

        Global.params = params;

        Global.package = packageInfo;

        Global.mode = Global.params.mode;

        Global.packageName = Global.package.desktop.package_name;

        Global.uuid = Storage.getUUID() || (Math.random() * Date.now()).toString(16).replace(".", "");

        Storage.setUUID(Global.uuid);

        // SET SERVER HOST MANAGER
        Global.hostManager.serverHost = Global.package.server_host[0];
        Global.hostManager.sourceHost = Global.package.source_host[0];
        Global.hostManager.imHost = Global.package.im_host[0];
        Global.hostManager.payHost = Global.package.pay_host[0];
        Global.hostManager.entryHost = Global.package.entry_host[0];
        Global.hostManager.jumpHost = Global.package.jump_host[0];
        Global.hostManager.tempHost = Global.package.temp_host[0];
        Global.hostManager.proxyHost = Global.package.proxy_host[0];
        Global.hostManager.webSourceHost = Global.package.web_source_host[0];
    }

    async get(url: string, params: any) {
        return await Axios.get(url, { params: params });
    }

    error() {
        window.location.hash = "/error";
    }

    ready() {
        console.log(Global);
        this.setState({ ready: true });
    }

    render() {
        return !this.state.ready ? null : (
            <HashRouter>
                <Switch>
                    <Route path="/index" component={Index} exact />
                    <Route path="/login" component={Login} exact />
                    <Route path="/error" component={Error} exact />
                    <Redirect from="**" to="/index" />
                </Switch>
            </HashRouter>
        );
    }
}

export default App;
