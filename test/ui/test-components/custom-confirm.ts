import {customElement, listen} from "@uxland/uxl-polymer2-ts";
import {LitElement, html} from "@polymer/lit-element";
import {ConfirmMixin} from "../../../src/confirm-mixin";

@customElement('custom-confirm')
export class CustomConfirm extends ConfirmMixin(LitElement){
    _render(props: CustomConfirm){
        return html `<h1>hello I'm custom confirm</h1><button id="button">Click me to close dialog</button>`;
    }

    @listen('click', 'button')
    onButtonClick(e){
        this.close(true);
    }
}