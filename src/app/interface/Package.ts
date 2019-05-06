export interface Package {
    id: number;
    default_proxy_user_id: number;
    name: string;
    server_host: string[];
    pay_host: string[];
    im_host: string[];
    source_host: string[];
    entry_host: string[];
    jump_host: string[];
    temp_host: string[];
    proxy_host: string[];
    desktop: Desktop;
    get_online_code: string;
    get_game_list: string;
}

export interface Desktop {
    package_name: string;
    app_version: string;
    app_down_url: string;
    hall_down_url: string;
    proxy_down_url: string;
    im_down_url: string;
    pay_down_url: string;
    hall_version: string;
    proxy_version: string;
    im_version: string;
    pay_version: string;
}
