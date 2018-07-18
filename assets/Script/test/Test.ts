import Fruit from "../game/Fruit";

export default class Test{
    public testFruit(){
        Fruit.prototype.onLoad = function () {
            let self = this;
            this.setStartPosition = () => {
                self.node.setPosition(-525, -318);
            };
        }
    }
}