import React, { Component } from "react";
import "./App.scss";
import Index from "./pages/index/Index";
import Login from "./pages/login/Login";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import Global from "./components/global/Global";

import Error from "./pages/error/Error";
import { parseQueryString } from "./lib/Lib";
import { Params } from "./interface/Params";
import Axios from "axios";
import Storage from "./components/storage/Storage";
import { Package } from "./interface/Package";
import Services from "./services/Services";

class App extends Component {
    state = {
        ready: false
    };

    async componentWillMount() {
        // ERROR
        if (window.location.hash === "#/error") return this.ready();

        // PARSE URL
        let info = (await this.getAuth()) as any;

        if (info.params === false) return this.error();

        // ENTRY INFO
        let params: Params = info.params as Params;
        let packageInfo: Package = info.packageInfo as Package;

        this.getPackage(params, packageInfo);

        this.getGameList();
    }

    getIconPath() {
        let os = Global.os;

        let packageName = `${Global.packageName}`;

        let pathName = packageName.replace(`.${os}`, "") + "/icon";

        return `${Global.hostManager.sourceHost}/${pathName}/`;
    }

    async getAuth() {
        let query = window.location.search;

        let queryObj = parseQueryString(query);

        let t = queryObj.t;

        let p = queryObj.p;

        let params = JSON.parse(decodeURIComponent(atob(p)));

        let a = t.slice(0, 36);

        let auth = "entry:" + a.slice(0, 10) + a.slice(14);

        let serverHost = atob(t.slice(36));

        Global.hostManager.serverHost = serverHost;

        Global.auth = auth;

        let authResponse = await Services.auth();
        if (!authResponse.data || authResponse.data.code !== 200) return this.error();

        let referer = authResponse.data.msg.data;

        Global.referer = referer;

        let packageResponse = await Services.getPackage({ package_id: params.package_id });
        if (!packageResponse.data || packageResponse.data.code !== 200) return this.error();

        let packageInfo = packageResponse.data.msg;

        return { params, packageInfo };
    }

    async getGameList() {
        // GET GAME LIST
        let gameList = await Services.getGameList({ package_id: Global.params.package_id });

        if (!gameList.data || gameList.data.code !== 200) {
            return this.error();
        }

        // SET GAME LIST
        Global.gameList = gameList.data.msg;

        // SHOW APP
        this.ready();
    }

    getPackage(params: Params, packageInfo: Package) {
        // SYSTEMS INFO

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
    }

    async get(url: string, params: any) {
        return await Axios.get(url, { params: params });
    }

    error() {
        window.location.hash = "/error";
    }

    ready() {
        this.setState({ ready: true });
    }

    componentDidMount(){
        window.resizeTo(1000,500)
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
