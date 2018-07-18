import {Socket} from "../../SocketInterface";
import Global from "../../global/Global";
import {GameData, GameEvent, PlayerIdentify} from "../../Connect/ClientAndServerConfig";
import GameBaseFactory from "../GameBaseFactory";

export default class GameConnect{
    private socket : Socket;
    private gameData : GameData;
    private otherThrowCallback : Function;
    constructor(){
        this.socket = Global.getSocket();
        this.gameData = Global.getGameData();
        this.start();
    }
    private start() : void{
        const socket = this.socket;
        socket.on(GameEvent.OTHER_QUIT, this.otherQuit);
        socket.on(GameEvent.GAME_OVER, this.gameOver);
        if(this.gameData.playerIdentify == PlayerIdentify.THROW_MAN){
            socket.on(GameEvent.OTHER_THROW, this.otherThrowCallback);
        }else{
            socket.on(GameEvent.UPDATE_OTHER_SCORE, this.updateScore);
        }
    }
    private otherQuit() : void{
        const gameBase = GameBaseFactory.getGameBase();
        gameBase.stateLayer.changeState("您的对手中途退出");
    }
    private updateScore(score : string) : void{
        Global.setScore(score);
    }
    private gameOver(){
        const gameBase = GameBaseFactory.getGameBase();
        gameBase.gameOver();
    }
    public listenThrow(callBack : Function){
        this.otherThrowCallback = callBack;
    }
}