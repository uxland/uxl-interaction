import {customElement, LitElement, html, unsafeCSS, css} from "lit-element";
import {listen} from '@uxland/uxl-utilities/listen';
import {notify} from '../../src/notify';
import * as styles from './notify-demo-styles.scss';

@customElement('notify-demo')
export class NotifyDemo extends LitElement{
    protected render() {
        return html`${template(this)}`;
    }

    static get styles() {
        return css`${unsafeCSS(styles)}`;
    }

    @listen('click', '#button')
    onClickButton1(e){
        let options: any = {message: 'Snackbar with "wide" classifier', showCloseButton: true, classifiers: ['fit-bottom'], delay: 5000};
        notify(options);
    }
    @listen('click', '#button2')
    onClickButton2(e){
        let options: any = {message: 'Normal Snackbar', showCloseButton: true, delay: 10000};
        notify(options);
    }
    @listen('click', '#button3')
    onClickButton3(e){
        let options: any = {message: 'danger Snackbar', showCloseButton: true, type: "danger", delay: 10000};
        notify(options);
    }
    @listen('click', '#button4')
    onClickButton4(e){
        let options: any = {message: 'warning Snackbar', showCloseButton: true, type: "warning", delay: 10000};
        notify(options);
    }
    @listen('click', '#button5')
    onClickButton5(e){
        let options: any = {message: 'info Snackbar', showCloseButton: true, type: "info", delay: 10000};
        notify(options);
    }
    @listen('click', '#button6')
    onClickButton6(e){
        let options: any = {message: 'without close button Snackbar', type: "info", delay: 10000};
        notify(options);
    }
    @listen('click', '#button7')
    onClickButton7(e){
        let options: any = {message: 'Custom colors Snackbar', showCloseButton: true, styles: {backgroundColor: '#283593', textColor: 'yellow', iconColor: 'yellow'}, delay: 10000};
        notify(options);
    }
    @listen('click', '#button8')
    onClickButton8(e){
        let options: any = {message: 'A top snackbar', showCloseButton: true, position: 'top', type: "info", delay: 10000};
        notify(options);
    }
    @listen('click', '#button9')
    onClickButton9(e){
        let options: any = {message: 'A center Snackbar', showCloseButton: true, position: 'center', type: "danger", delay: 10000};
        notify(options);
    }
    @listen('click', '#button10')
    onClickButton10(e){
        let options: any = {message: 'A success Snackbar', showCloseButton: true, type: 'success', delay: 10000};
        notify(options);
    }

}

const template = (props: NotifyDemo) => html`
    <h2>Notify Demo</h2>
    <button id="button">Fit bottom Snackbar</button>
    <button id="button2">Normal Snackbar</button>
    <button id="button3">danger Snackbar</button>
    <button id="button4">warning Snackbar</button>
    <button id="button5">info Snackbar</button>
    <button id="button10">success Snackbar</button>
    <button id="button6">without close button Snackbar</button>
    <button id="button7">Custom colors Snackbar</button>
    <button id="button8">Top position Snackbar</button>
    <button id="button9">Center position Snackbar</button>
`;
