import Axios from "axios";
import Global from "../components/global/Global";
import Api from "../api/Api";

class Services {
    async officialLogin(params: {}) {
        return await Axios.get(Global.hostManager.serverHost + Api.officialLogin, { params: params });
    }
}

export default new Services();
