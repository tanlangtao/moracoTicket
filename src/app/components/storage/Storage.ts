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
            account: {}
        });
        let gameAccount = localStorage.getItem("gameAccount")||userInfoString;
        if (gameAccount===undefined){
            return JSON.parse(gameAccount);
        }else{
            return {};
        }
        
        
        
    }
    getUserInfo(): UserInfo {
        let userInfoString = JSON.stringify({
            game_user: {},
            proxy_user: {},
            prev_proxy: {},
            account: { game: { account: {} } }
        });
        let userInfostring2= localStorage.getItem("userInfo") || userInfoString

        return JSON.parse(userInfostring2) as UserInfo;
    }

    setUUID(uuid: string) {
        localStorage.setItem("uuid", uuid);
    }

    getUUID(): string {
        return localStorage.getItem("uuid") || "";
    }
}

export default new Storage();
