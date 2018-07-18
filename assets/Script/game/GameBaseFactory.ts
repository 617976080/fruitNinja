import GameBaseAbstract, {GamePatten} from "./GameBaseAbstract";
import GameBaseNative from "./GameBaseNative";
import GameBasePVP from "./GameBasePVP";

export default class GameBaseFactory{
    public static instance;

    public static createGameBase(gamePatten : GamePatten){
        if(GameBaseAbstract.isInit() === false) throw new Error("Please initialize class GameBaseAbstract");
        let instance;
        switch (gamePatten){
            case GamePatten.NATIVE:
                instance = new GameBaseNative();
                break;
            case GamePatten.PVP:
                instance = new GameBasePVP();
                break;
            default:
                throw new Error("GamePatten" + gamePatten + "is not exist");

        }
        return GameBaseFactory.instance = instance;
    }
    public static getGameBase() : GameBaseAbstract{
        if(GameBaseFactory.instance === null) throw new Error("Instance is not exist");
        return GameBaseFactory.instance;
    }
}