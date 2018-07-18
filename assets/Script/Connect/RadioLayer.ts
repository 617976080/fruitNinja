import property = cc._decorator.property;
import ccclass = cc._decorator.ccclass;
export interface RadioButton{
    text : string,
    callFn : Function
}
@ccclass
export default class RadioLayer extends cc.Component{
    @property({
        type : cc.Prefab
    })
    private buttonPrefab : cc.Prefab;

    @property({
        type : cc.Label
    })
    private textLabel : cc.Label;

    @property({
        type : cc.Node
    })
    private buttonContainer : cc.Node;
    public onLoad() : void{
        this.node.active = false;
    }
    public radio (text : string, buttons : RadioButton[]) : void{
        this.node.active = true;
        this.textLabel.string = text;
        this.buttonContainer.removeAllChildren(true);

        buttons.forEach( (button) => {
            let node = cc.instantiate(this.buttonPrefab);
            node.children[0].getComponent(cc.Label).string = button.text;
            node.on('touchstart', () => {
                button.callFn();
                this.node.active = false;
            });
            this.buttonContainer.addChild(node, 0);
        });
    }
    public confirm (text, confirmString = "确认", callback? : Function) : void {
        this.radio(text, [{text : confirmString, callFn : callback || function(){}}]);
    }
}