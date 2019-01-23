import {LitElement, html} from "lit-element";
import {customElement} from "lit-element";

@customElement('custom-notify')
export class CustomNotify extends LitElement{
    render(){
        return html `<h1>hello I'm custom notify</h1>`;
    }
}
