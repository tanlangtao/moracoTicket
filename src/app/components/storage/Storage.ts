import { UserInfo } from "../../interface/User";

class Storage {
    setUserInfo(user: UserInfo) {
        localStorage.setItem("userInfo", JSON.stringify(user));
    }

    delUserInfo() {
        localStorage.removeItem("userInfo");
    }

    getUserInfo(): UserInfo {
        let userInfoString = JSON.stringify({
            game_user: {},
            proxy_user: {},
            prev_proxy: {},
            account: { game: { account: {} } }
        });

        return JSON.parse(localStorage.getItem("userInfo") || userInfoString) as UserInfo;
    }

    setUUID(uuid: string) {
        localStorage.setItem("uuid", uuid);
    }

    getUUID(): string {
        return localStorage.getItem("uuid") || "";
    }
}

export default new Storage();
