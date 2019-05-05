export interface Game {
    _id: string;
    game_id: string;
    game_name: string;
    game_img: string;
    canvas: string;
    webgl: string;
    dev_id: number;
    down_canvas: string;
    down_webgl: string;
    version: string;
    open: number;
    game_host: string[];
    package_id: number;
    sort: number;
    type: number;
    web_game_img: string;
    web_down_webgl: string;
}
