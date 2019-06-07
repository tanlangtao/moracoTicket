import { UserInfo,Account } from "../../interface/User";
class Storage {
    setUserInfo(user: UserInfo) {
        console.log('setUserInfo',user)
        localStorage.setItem("userInfo", JSON.stringify(user));
    }

    delUserInfo() {
        localStorage.removeItem("userInfo");
    }

    setGameAccount(gameAccount:any){
        console.log('gameAccount',gameAccount)
        localStorage.setItem("gameAccount", JSON.stringify(gameAccount));
    }

    getGameAccount(){
        let userInfoString = JSON.stringify({
            account: {

            } 
        });

        return JSON.parse(localStorage.getItem("gameAccount") || userInfoString) as Account;
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
