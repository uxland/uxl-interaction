import * as tslib_1 from "tslib";
import { NotifyMixin } from "../../src/notify-mixin";
import { PolymerElement } from '@polymer/polymer/polymer-element';
import * as sinon from 'sinon';
import { customElement, LitElement } from "lit-element";
const { expect } = chai;
describe('Given an instance of notifyMixin', () => {
    it('should raise closed event when invoking close function', () => {
        let Component = class Component extends NotifyMixin(LitElement) {
        };
        Component = tslib_1.__decorate([
            customElement('my-component1')
        ], Component);
        let c = new Component();
        let spy = sinon.spy();
        c.addEventListener('closed', spy);
        c.close();
        expect(spy.calledOnce).to.be.true;
        c.close();
        expect(spy.calledTwice).to.be.true;
    });
    it('should declare a model property', () => {
        let Component = class Component extends NotifyMixin(PolymerElement) {
        };
        Component = tslib_1.__decorate([
            customElement('my-component2')
        ], Component);
        expect(Component.properties.model).exist;
    });
});
//# sourceMappingURL=notify-mixin.spec.js.map