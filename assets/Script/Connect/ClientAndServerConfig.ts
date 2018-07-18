export enum MatchMethod{
    SYSTEM_MATCH = "systemMatch",
    FREE_MATCH = "freeMatch"
}
export enum GameEvent{
    CONNECTED = "a", // 连接成功
    DISCONNECTED = "b",// 断开连接
    SUBMIT_PLAYER_NAME = "c",//提交昵称
    SUCCESS_PLAYER_NAME = "d", // 成功提交昵称
    REPEAT_PLAYER_NAME = "e",// 昵称已存在

    WAIT_MATCH = "f",// 等待系统匹配

    LOADED_PLAYER_LIST = "g", // 获取玩家列表
    WAIT_OTHER_REPLY = "h", // 等待对方确认
    THROW_ITEM = "i", // 扔出水果或者炸弹,
        OTHER_THROW = "j", // 对方扔出水果或者炸弹
    INVITE_OTHER = "k", // 邀请其他玩家对战
    RECEIVE_OTHER_INVITATION = "l", // 接收对战邀请
    REFUSED_INVITATION = "m",// 拒绝对战邀请
    GAME_START = "n",// 开始游戏
    OTHER_QUIT = "o",// 对方退出游戏
    UPDATE_OTHER_SCORE = "p",// 对方分数变更
    GAME_OVER = "q"// 游戏结束
}
export interface PlayerListItem{
    id : number;
    playerName : string;
}
export enum PlayerIdentify{
    THROW_MAN,
    KNIFE_MAN
}
export interface GameData{
    playerName : string;
    enemyName : string;
    playerIdentify : PlayerIdentify;
    enemyIdentify : PlayerIdentify;
}