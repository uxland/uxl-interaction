import {ConfirmMixin} from "../../src/confirm-mixin";
import {PolymerElement} from '@polymer/polymer/polymer-element';
import * as sinon from 'sinon';
import {customElement} from "@uxland/uxl-polymer2-ts";
const {expect} = chai;

describe('Given an instance of confirmMixin', () =>{
    it('should raise closed event when invoking close function', () =>{
        @customElement('my-component1')
        class Component extends ConfirmMixin(PolymerElement){

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
        class Component extends ConfirmMixin(PolymerElement){

        }
        expect((<any>Component).properties.model).exist;
    });
});