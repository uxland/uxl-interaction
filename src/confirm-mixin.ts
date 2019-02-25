import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin';
import {property, LitElement} from "lit-element";
export interface ConfirmMixinBase<T = any> extends LitElement{
    model: T;
    close(result: boolean): void;
    canAccept(): Promise<boolean>;
    accept(): Promise<void>;
}
export interface IConfirmMixin<T = any, Model = any> extends ConfirmMixinBase<Model>{
    new(): IConfirmMixin<T, Model> & T;
}
export const ConfirmMixin = dedupingMixin(parent =>{
    class mixin extends parent {
        @property()
        model: any;
        close(result: boolean){
            this.dispatchEvent(new CustomEvent('closed', {detail: result}));
        }
        canAccept() : Promise<boolean> {return Promise.resolve(true)}
        accept() : Promise<void> {return Promise.resolve()}
    }
    return mixin as IConfirmMixin;
});
