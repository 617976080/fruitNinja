import {GameEvent} from "./Connect/ClientAndServerConfig";

export interface Socket{
    emit(event : GameEvent,...args : any[]) : void;
    on(event : GameEvent, callFn : Function);
    close() : void;
}