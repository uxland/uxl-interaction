import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin';
import {property} from "@uxland/uxl-polymer2-ts";
export interface NotifyMixinBase<T = any> {
    model: T;
    close(): void;
}
export interface INotifyMixin<T, Model> extends NotifyMixinBase<Model>{
    new(): INotifyMixin<T, Model> & T;
}
export const NotifyMixin = dedupingMixin(parent =>{
    class mixin extends parent {
        @property()
        model: any;
        close(){
            this.dispatchEvent(new CustomEvent('closed'));
        }

    };
    return mixin;
});