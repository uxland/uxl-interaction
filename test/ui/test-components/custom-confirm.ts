import {LitElement, html} from "lit-element";
import {ConfirmMixin} from "../../../src/confirm-mixin";
import {customElement} from "lit-element";

@customElement('custom-confirm')
export class CustomConfirm extends ConfirmMixin(LitElement){
    render(){
        return html `<h1>hello I'm custom confirm</h1><button @click="${this._buttonClick}" id="button">Click me to close dialog</button>`;
    }
    _buttonClick(e){
        this.close(true);
    }
}
