import Fruit from "./Fruit";
import Config from "../global/Config";

export default abstract class FruitStrategy{
    protected fruit : Fruit;
    constructor(fruit : Fruit){
        this.fruit = fruit;
    }
    public abstract setStartPosition() : void;
    public abstract jumpAction() : cc.Action;
    protected getJumpDuration() : number{
        return Config.throwDuration;
    }
}