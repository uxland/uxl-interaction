import { dedupingMixin } from '@uxland/uxl-utilities';
import { property } from 'lit-element';
export interface NotifyMixinBase<T = any> {
  model: T;
  close(): void;
}
export interface INotifyMixin<T, Model> extends NotifyMixinBase<Model> {
  new (): INotifyMixin<T, Model> & T;
}
export const NotifyMixin = dedupingMixin(parent => {
  class mixin extends parent {
    @property()
    model: any;
    close() {
      this.dispatchEvent(new CustomEvent('closed'));
    }
  }
  return mixin;
});
