import property = cc._decorator.property;
import ConnectStateLayer from "./ConnectStateLayer";
import {GameEvent, MatchMethod, PlayerIdentify, PlayerListItem} from "./ClientAndServerConfig";
import Config from "../global/Config";
import PlayerList from "./PlayerList";
import RadioLayer from "./RadioLayer";
import Global from "../global/Global";
import {Socket} from "../SocketInterface";
import ccclass = cc._decorator.ccclass;
import LinkLayer from "./LinkLayer";
@ccclass
export default class Connect extends cc.Component{
    @property({
        type : ConnectStateLayer,
        default : null
    })
    private connectStateLayer : ConnectStateLayer;

    @property({
        type : PlayerList,
        default : null
    })
    private playerList : PlayerList;

    @property({
        type : RadioLayer,
        default : null
    })
    private radioLayer : RadioLayer;

    @property({
        type : cc.Node,
        default : null
    })
    private backButton : cc.Node;
    private onBack : boolean;

    @property({
        type : LinkLayer,
        default : null
    })
    private linkLayer : LinkLayer;


    private socket : Socket;
    private playerName : string;
    private enemyName : string;
    private playerIdentify : PlayerIdentify;
    private enemyIdentify : PlayerIdentify;
    public onLoad(){
        let socket : Socket = window["io"](Config.SERVER_IP, {timeout : Config.TIMEOUT});
        socket.on(GameEvent.CONNECTED, this.connected);
        this.socket = socket;
        this.onBack = false;
        this.backButton.on("touchstart", this.back);
        this.playerList.node.active = false;
        this.radioLayer.node.active = false;
    }
    private back = () =>{
        if(this.onBack) return;
        this.onBack = true;
        this.socket.close();
        cc.director.loadScene("Launch");
    };
    private getPlayerIdentifyName(identify : PlayerIdentify){
        switch (identify){
            case PlayerIdentify.KNIFE_MAN:
                return "切割";
            case PlayerIdentify.THROW_MAN:
                return "投掷";
        }
    }
    private failConnect() :void{
        this.socket.emit(GameEvent.DISCONNECTED);
    }
    private connected = (error : string) => {
        if(error != null){
            this.connectStateLayer.changeState(error,function(){
                this.failConnect();
            });
            return;
        }
        this.connectStateLayer.changeState('连接成功,请输入您的昵称');
        this.socket.on(GameEvent.SUCCESS_PLAYER_NAME, this.loadedPlayerList);
        this.linkLayer.initialize(this.submitPlayerName);
    };
    public submitPlayerName = (playerName : string, matchMethod : MatchMethod) => {
        if(playerName.length === 0){
            this.connectStateLayer.changeState('昵称不能为空');
        }
        this.playerName = playerName;
        const socket = this.socket;
        socket.emit(GameEvent.SUBMIT_PLAYER_NAME, playerName, matchMethod);
        socket.on(GameEvent.REPEAT_PLAYER_NAME, this.repeatPlayerName);
        socket.on(GameEvent.LOADED_PLAYER_LIST, this.loadedPlayerList);
    };
    private repeatPlayerName = () => {
        this.connectStateLayer.changeState('您输入的昵称已存在', function(){
            cc.director.loadScene('launch');
        });
    };
    private loadedPlayerList = (list : PlayerListItem[]) => {
        this.playerList.load(list);
        this.playerList.setOnTouch((item : PlayerListItem) => {
            this.radioLayer.radio('请选择您的对战身份',[
                {
                    text : '投掷',
                    callFn : () => {
                        this.socket.emit(GameEvent.INVITE_OTHER, PlayerIdentify.THROW_MAN, item.id);
                    }
                },
                {
                    text : '切割',
                    callFn : () => {
                        this.socket.emit(GameEvent.INVITE_OTHER, PlayerIdentify.KNIFE_MAN, item.id);
                    }
                }
            ]);
        });
        this.socket.on(GameEvent.RECEIVE_OTHER_INVITATION,this.receiveInvitation);
        this.socket.on(GameEvent.REFUSED_INVITATION, this.refuseInvitation);
        this.socket.on(GameEvent.GAME_START, this.prepareStartGame);
    };
    private receiveInvitation = (enemyName : string, enemyIdentify : PlayerIdentify, callFn : (accept : boolean) => void) => {
        this.radioLayer.radio(
            enemyName + '对方邀请您一起对战, 您是' + this.getPlayerIdentifyName(enemyIdentify) + '方, 是否同意对战',
            [
                {
                    text : '同意',
                    callFn : function(){
                        callFn(true);
                    }
                },
                {
                    text : '拒绝',
                    callFn : function(){
                        callFn(false);
                    }
                }
            ]);
        this.enemyName = enemyName;
        this.enemyIdentify = enemyIdentify;
        this.playerIdentify = enemyIdentify === PlayerIdentify.THROW_MAN ? PlayerIdentify.KNIFE_MAN : PlayerIdentify.THROW_MAN;
    };
    private refuseInvitation = () => {
        this.radioLayer.confirm('对方拒绝了您的对战请求');
    };
    private prepareStartGame = (enemyName : string, enemyIdentify : PlayerIdentify) => {
        this.hideBackButton();
        this.connectStateLayer.node.active = false;
        this.radioLayer.node.active = false;
        let time = 0;
        Global.setSocket(this.socket);
        cc.director.loadScene("Game");
    };
    private hideBackButton() : void{

    }
}