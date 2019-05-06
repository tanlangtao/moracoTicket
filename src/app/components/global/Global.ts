import { UserInfo } from "../../interface/User";
import { Params } from "../../interface/Params";
import { Package } from "../../interface/Package";
import { Game } from "../../interface/GameList";
import HostManager from "../../interface/HostManager";

class Global {
    // MODE
    mode = "dev";

    // OS
    os = "desktop";

    // PAKCAGE NAME
    packageName = "";

    // HostManager
    hostManager = {} as HostManager;

    // UUID
    uuid = "";

    // PACKAGE INFO
    package = {} as Package;

    // USER INFO
    userInfo = {
        game_user: {},
        proxy_user: {},
        prev_proxy: {},
        account: { game: { account: {} } }
    } as UserInfo;

    // ENTRY INFO
    params = {} as Params;

    // GAME LIST
    gameList = [] as Game[];

    isLogin() {
        return !!this.userInfo.game_user.id;
    }
}

export default new Global();
