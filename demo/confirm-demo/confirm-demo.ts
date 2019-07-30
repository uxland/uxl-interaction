import { customElement, LitElement, html, unsafeCSS, css } from 'lit-element';
import { doConfirm } from '../../src/confirm';
import * as styles from './confirm-demo-styles.scss';

@customElement('confirm-demo')
export class ConfirmDemo extends LitElement {
  protected render() {
    return html`
      ${template(this)}
    `;
  }

  static get styles() {
    return css`
      ${unsafeCSS(styles)}
    `;
  }
  onClickButton1(e) {
    let options = {
      containerId: 'id1',
      title: 'A normal confirm dialog',
      message: "Hi! I'm a Dialog :)",
      acceptLabel: 'Accept',
      cancelLabel: 'Cancel'
    };
    doConfirm(options);
  }
  onClickButton2(e) {
    let options = {
      title: 'A normal confirm dialog',
      message: "Hi! I'm a Dialog :)",
      acceptLabel: 'Accept',
      cancelLabel: 'Cancel',
      showCloseButton: true
    };
    doConfirm(options);
  }
  onClickButton3(e) {
    let options: any = {
      title: 'A info confirm dialog',
      message: "Hi! I'm a Dialog :)",
      type: 'info',
      acceptLabel: 'Accept',
      cancelLabel: 'Cancel',
      showCloseButton: true
    };
    doConfirm(options);
  }
  onClickButton4(e) {
    let options: any = {
      title: 'A warning confirm dialog',
      message: "Hi! I'm a Dialog :)",
      type: 'warning',
      acceptLabel: 'Accept',
      cancelLabel: 'Cancel',
      showCloseButton: true
    };
    doConfirm(options);
  }
  onClickButton5(e) {
    let options: any = {
      title: 'A danger confirm dialog',
      message: "Hi! I'm a Dialog :)",
      type: 'danger',
      acceptLabel: 'Accept',
      cancelLabel: 'Cancel',
      showCloseButton: true
    };
    doConfirm(options);
  }
  onClickButton6(e) {
    let options: any = {
      title: 'A success confirm dialog',
      message: "Hi! I'm a Dialog :)",
      type: 'success',
      acceptLabel: 'Accept',
      cancelLabel: 'Cancel',
      showCloseButton: true
    };
    doConfirm(options);
  }
  onClickButton7(e) {
    let options: any = {
      title: 'A modal confirm dialog',
      message: "Hi! I'm a Dialog :)",
      type: 'info',
      acceptLabel: 'Accept',
      cancelLabel: 'Cancel',
      showCloseButton: true,
      modal: true
    };
    doConfirm(options);
  }
  onClickButton8(e) {
    let options: any = {
      title: 'A full screen confirm dialog',
      message: "Hi! I'm a Dialog :)",
      type: 'info',
      acceptLabel: 'Accept',
      cancelLabel: 'Cancel',
      showCloseButton: true,
      fullScreen: true
    };
    doConfirm(options);
  }
  onClickButton9(e) {
    let options: any = {
      title: 'A header dismiss dialog',
      message: "Hi! I'm a Dialog :)",
      type: 'info',
      acceptLabel: 'Accept',
      cancelLabel: 'Cancel',
      showCloseButton: true,
      headerDismiss: true
    };
    doConfirm(options);
  }
  onClickButton10(e) {
    let options: any = {
      containerId: 'custom-css',
      title: 'A confirm dialog with custom css properties',
      message: "Hi! I'm a Dialog :)",
      type: 'info',
      acceptLabel: 'Accept',
      cancelLabel: 'Cancel',
      showCloseButton: true,
      styles: {
        backgroundColor: '#E8EAF6',
        headerBackgroundColor: '#CCC000',
        textColor: 'black',
        closeIconColor: '#fff',
        acceptColor: '#283593',
        actionsBackgroundColor: '#fff176'
      }
    };
    doConfirm(options);
  }
  onClickButton11(e) {
    let options: any = {
      title: 'A confirm dialog with custom size',
      message: "Hi! I'm a Dialog :)",
      type: 'info',
      acceptLabel: 'Accept',
      cancelLabel: 'Cancel',
      modal: true,
      showCloseButton: true,
      styles: { width: '70vw', height: '50vh' }
    };
    doConfirm(options);
  }
}

const template = (props: ConfirmDemo) => html`
  <h2>Confirm demo</h2>
  <button id="button1" @click="${props.onClickButton1}">Show normal Confirm</button>
  <button id="button2" @click="${props.onClickButton2}">Show normal Confirm with close button</button>
  <button id="button3" @click="${props.onClickButton3}">Show info type Confirm</button>
  <button id="button4" @click="${props.onClickButton4}">Show warning type Confirm</button>
  <button id="button5" @click="${props.onClickButton5}">Show danger type Confirm</button>
  <button id="button6" @click="${props.onClickButton6}">Show success type Confirm</button>
  <button id="button7" @click="${props.onClickButton7}">Show modal Confirm</button>
  <button id="button8" @click="${props.onClickButton8}">Show fullScreen Confirm</button>
  <button id="button9" @click="${props.onClickButton9}">Show headerDismiss Confirm</button>
  <button id="button10" @click="${props.onClickButton10}">Show custom colors Confirm</button>
  <button id="button11" @click="${props.onClickButton11}">Show custom size Confirm</button>
`;
