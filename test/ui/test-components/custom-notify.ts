import {customElement} from "@uxland/uxl-polymer2-ts";
import {LitElement, html} from "@polymer/lit-element";

@customElement('custom-notify')
export class CustomNotify extends LitElement{
    _render(props: CustomNotify){
        return html `<h1>hello I'm custom notify</h1>`;
    }
}