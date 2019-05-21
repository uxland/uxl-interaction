import {customElement, LitElement, html, unsafeCSS, css} from "lit-element";
import {listen} from '@uxland/uxl-utilities/listen';
import {doConfirm} from '../../src/confirm';
import * as styles from './confirm-demo-styles.scss';

@customElement('confirm-demo')
export class ConfirmDemo extends LitElement{
    protected render() {
        return html`${template(this)}`;
    }

    static get styles() {
        return css`${unsafeCSS(styles)}`;
    }

    @listen('click', '#button1')
    onClickButton1(e){
        let options = {title: 'A normal confirm dialog', message: 'Hi! I\'m a Dialog :)', acceptLabel: 'Accept', cancelLabel: 'Cancel'};
        doConfirm(options);
    }
    @listen('click', '#button2')
    onClickButton2(e){
        let options = {title: 'A normal confirm dialog', message: 'Hi! I\'m a Dialog :)', acceptLabel: 'Accept', cancelLabel: 'Cancel', showCloseButton: true};
        doConfirm(options);
    }
    @listen('click', '#button3')
    onClickButton3(e){
        let options:any = {title: 'A info confirm dialog', message: 'Hi! I\'m a Dialog :)', type: "info", acceptLabel: 'Accept', cancelLabel: 'Cancel', showCloseButton: true};
        doConfirm(options);
    }
    @listen('click', '#button4')
    onClickButton4(e){
        let options:any = {title: 'A warning confirm dialog', message: 'Hi! I\'m a Dialog :)', type: "warning", acceptLabel: 'Accept', cancelLabel: 'Cancel', showCloseButton: true};
        doConfirm(options);
    }
    @listen('click', '#button5')
    onClickButton5(e){
        let options:any = {title: 'A danger confirm dialog', message: 'Hi! I\'m a Dialog :)', type: "danger", acceptLabel: 'Accept', cancelLabel: 'Cancel', showCloseButton: true};
        doConfirm(options);
    }
    @listen('click', '#button6')
    onClickButton6(e){
        let options:any = {title: 'A success confirm dialog', message: 'Hi! I\'m a Dialog :)', type: "success", acceptLabel: 'Accept', cancelLabel: 'Cancel', showCloseButton: true};
        doConfirm(options);
    }
    @listen('click', '#button7')
    onClickButton7(e){
        let options:any = {title: 'A modal confirm dialog', message: 'Hi! I\'m a Dialog :)', type: "info", acceptLabel: 'Accept', cancelLabel: 'Cancel', showCloseButton: true, modal: true};
        doConfirm(options);
    }
    @listen('click', '#button8')
    onClickButton8(e){
        let options:any = {title: 'A full screen confirm dialog', message: 'Hi! I\'m a Dialog :)', type: "info", acceptLabel: 'Accept', cancelLabel: 'Cancel', showCloseButton: true, fullScreen: true};
        doConfirm(options);
    }
    @listen('click', '#button9')
    onClickButton9(e){
        let options:any = {title: 'A header dismiss dialog', message: 'Hi! I\'m a Dialog :)', type: "info", acceptLabel: 'Accept', cancelLabel: 'Cancel', showCloseButton: true, headerDismiss: true};
        doConfirm(options);
    }
    @listen('click', '#button10')
    onClickButton10(e){
        let options:any = {title: 'A confirm dialog with custom css properties', message: 'Hi! I\'m a Dialog :)', type: "info", acceptLabel: 'Accept', cancelLabel: 'Cancel', showCloseButton: true, styles: {backgroundColor: "#E8EAF6", headerBackgroundColor: "#CCC000", textColor: "black", closeIconColor: "#fff", acceptColor: "#283593", actionsBackgroundColor: "#fff176"}};
        doConfirm(options);
    }
    @listen('click', '#button11')
    onClickButton11(e){
        let options:any = {title: 'A confirm dialog with custom size', message: 'Hi! I\'m a Dialog :)', type: "info", acceptLabel: 'Accept', cancelLabel: 'Cancel', modal: true, showCloseButton: true, styles: {width: "70vw", height: "50vh"}};
        doConfirm(options);
    }

}

const template = (props: ConfirmDemo) => html`
    <h2>Confirm demo</h2>
    <button id="button1">Show normal Confirm</button>
    <button id="button2">Show normal Confirm with close button</button>
    <button id="button3">Show info type Confirm</button>
    <button id="button4">Show warning type Confirm</button>
    <button id="button5">Show danger type Confirm</button>
    <button id="button6">Show success type Confirm</button>
    <button id="button7">Show modal Confirm</button>
    <button id="button8">Show fullScreen Confirm</button>
    <button id="button9">Show headerDismiss Confirm</button>
    <button id="button10">Show custom colors Confirm</button>
    <button id="button11">Show custom size Confirm</button>
    <button id="button12">Show custom component Confirm</button>
`;
