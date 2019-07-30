import * as tslib_1 from "tslib";
import { ConfirmMixin } from "../../src/confirm-mixin";
import { PolymerElement } from '@polymer/polymer/polymer-element';
import * as sinon from 'sinon';
import { customElement, LitElement } from "lit-element";
const { expect } = chai;
describe('Given an instance of confirmMixin', () => {
    it('should raise closed event when invoking close function', () => {
        let Component = class Component extends ConfirmMixin(LitElement) {
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
        let Component = class Component extends ConfirmMixin(PolymerElement) {
        };
        Component = tslib_1.__decorate([
            customElement('my-component2')
        ], Component);
        expect(Component.properties.model).exist;
    });
});
//# sourceMappingURL=confirm-mixin.spec.js.map