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
}

export default new Services();
