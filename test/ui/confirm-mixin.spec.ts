import {ConfirmMixin} from "../../src/confirm-mixin";
import * as sinon from 'sinon';
import {customElement, LitElement} from "lit-element";
const {expect} = chai;

describe('Given an instance of confirmMixin', () =>{
    it('should raise closed event when invoking close function', () =>{
        @customElement('my-component1')
        class Component extends ConfirmMixin(LitElement){

        }
        let c: any = new Component();
        let spy = sinon.spy();
        c.addEventListener('closed', spy);
        c.close();
        expect(spy.calledOnce).to.be.true;
        c.close();
        expect(spy.calledTwice).to.be.true;
    }) ;
    it('should declare a model property', () =>{
        @customElement('my-component2')
        class Component extends ConfirmMixin(LitElement){

        }
        expect((<any>Component).properties.model).exist;
    });
});
