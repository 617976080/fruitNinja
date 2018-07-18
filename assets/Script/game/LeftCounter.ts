import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
export enum CountSubject{
    FRUIT,
    BOOM
}
@ccclass
export default class LeftCounter extends cc.Component{
    @property({
        type : cc.Label,
        default : null
    })
    private fruitCount : cc.Label;

    @property({
        type : cc.Label,
        default : null
    })
    private boomCount : cc.Label;

    public setCounts(fruitCount : number, boomCount : number) : void{
        this.fruitCount.string = fruitCount + "";
        this.boomCount.string = boomCount + "";
    }
    private updateCount(label : cc.Label) : boolean{
        let count = parseInt(label.string);
        if(count === 0) return false;
        label.string = --count + "";
        return true;
    }
    private getLabel(subject : CountSubject){
        switch (subject){
            case CountSubject.BOOM:
                return this.boomCount;
            case CountSubject.FRUIT:
                return this.fruitCount;
            default:
                throw new Error("Count subject" + subject +" is not exist!");
        }
    }
    public updateSubject(subject : CountSubject) : boolean{
        return this.updateCount(this.getLabel(subject));
    }
    public setSubject(count : number, subject : CountSubject) : void{
        this.getLabel(subject).string = count + "";
    }
    public getLeft(subject : CountSubject) : number{
        return parseInt(this.getLabel(subject).string);
    }
}