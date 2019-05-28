import Axios from "axios";
import Global from "../components/global/Global";
import Api from "../api/Api";
import Qs from "querystring";

class Services {
    async officialLogin(params: {}) {
        return await Axios.get(Global.hostManager.serverHost + Api.officialLogin, { params: params });
    }

    async regin(params: {}) {
        return await Axios.post(Global.hostManager.serverHost + Api.regin, Qs.stringify(params));
    }

    async createGameAccount(params: {}) {
        return await Axios.post(Global.hostManager.serverHost + Api.createGameAccount, Qs.stringify(params));
    }

    async auth() {
        return await Axios.get(Global.hostManager.serverHost + Api.auth, { params: { auth: Global.auth } });
    }

    async getPackage(params: {}) {
        return await Axios.get(Global.hostManager.serverHost + Api.getServerInfo, { params: { auth: Global.auth, ...params } });
    }

    async getGameList(params: {}) {
        return await Axios.get(Global.hostManager.serverHost + Api.getGameList, { params: { auth: Global.auth, ...params } });
    }
}

export default new Services();
