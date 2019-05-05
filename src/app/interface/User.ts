export interface UserInfo {
    game_user: GameUser;
    account: Account;
    proxy_user: ProxyUser;
    prev_proxy: ProxyUser;
}

export interface Account {
    account_name: number;
    account_pass: string;
    game: any;
    proxy: any[];
    pay: any[];
    config: Config;
    account_base_pass: string;
}

export interface Config {
    default_pass: string;
    default_temp_id: number;
}

export interface Induction {
    balance: number;
    game_name: string;
    lock_balance: number;
    prepayments: number;
    bet_money: number;
    win_money: number;
    lose_money: number;
    bet_times: number;
    win_times: number;
    status: number;
    banker_balance: number;
}

export interface GameUser {
    id: number;
    uuid: string;
    game_nick: string;
    proxy_user_id: number;
    game_gold: number;
    bank_gold: number;
    lock_gold: number;
    change_time: number;
    login_time: number;
    login_ip: string;
    regin_time: number;
    regin_ip: string;
    phone_number: string;
    status: number;
    game_user_type: number;
    game_img: string;
    package_id: number;
    device_id: string;
}

export interface ProxyUser {
    id: number;
    proxy_nick: string;
    proxy_pid: number;
    proxy_lv: number;
    balance: number;
    lock_balance: number;
    change_time: number;
    login_time: number;
    login_ip: string;
    regin_time: number;
    regin_ip: string;
    proxy_number: number;
    user_number: number;
    status: number;
    proxy_user_type: number;
    package_id: number;
    proxy_img: string;
}
