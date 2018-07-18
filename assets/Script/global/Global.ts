import {GameData} from "../Connect/ClientAndServerConfig";

export enum GameState{
    WAIT_RESULT
}
export default class Global{
    private static scoreLabels : cc.Label[] = [];
    private static score : number = 0;
    private static gamePatten : any;
    private static socket : any;
    private static gameData : GameData;
    public static getBestScore() : string{
        return cc.sys.localStorage.getItem("bestScore") || "0";
    }
    public static gameOver() : void{
        Global.updateBestScore();
        Global.score = 0;
    }
    private static updateBestScore() : void{
        const bestScore = parseInt(Global.getBestScore());
        if(Global.score > bestScore){
            cc.sys.localStorage.setItem("bestScore", Global.score);
        }
    }
    public static changeState(state : GameState) : void{

    }
    public static addScoreLabel(label : cc.Label) : void{
        this.scoreLabels.push(label);
    }
    public static addScore() : void{
        Global.setScore(++Global.score);
    }
    public static setScore(score) : void{
        const string = score + "";
        this.scoreLabels.forEach((label) => {
            label.string = string;
        });
    }
    public static setGamePatten(gamePatten : any){
        Global.gamePatten = gamePatten;
    }
    public static getGamePatten() : any{
        return Global.gamePatten;
    }
    public static setSocket(socket : any) : void {
        Global.socket = socket;
    }
    public static getSocket() : any{
        return Global.socket;
    }
    public static setGameData(gameData : GameData) : void{
        Global.gameData = gameData;
    }
    public static getGameData() : GameData{
        return Global.gameData;
    }
}