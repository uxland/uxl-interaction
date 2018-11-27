import {customElement, item, listen, property} from "@uxland/uxl-polymer2-ts"
import {html, LitElement} from '@polymer/lit-element/lit-element';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-toast/paper-toast.js';
import {NotifyOptions} from "../notify";
import CSS from './notify-component-styles.js';

const renderCloseButton = (show: boolean, classifier: any) => show ? html`
                        <paper-icon-button
                            id="action-btn"     
                            class="close-btn ${classifier}" 
                            icon="icons:close">  
                        </paper-icon-button>` : undefined;

const renderCustomContent = (props: NotifyComponent) => {
    if(props.options.htmlTag){
        let component = document.createElement(props.options.htmlTag);
        component.setAttribute('id', '__custom-element__');
        component.addEventListener('close', props.close);
        return html `${component}`;
    }
};

const renderContent = (props: NotifyComponent) => props.options.message ? renderCloseButton(props.options.showCloseButton, props.options.classifiers) : renderCustomContent(props);

const renderToast = (props: NotifyComponent) => html`
<paper-toast
            id="toast" 
            class="${(props.options.classifiers || []).map(item => item)}"
            position="${props.options.position}" 
            .duration="${props.options.delay}"
            type="${props.options.type}" 
            .text="${props.options.message || ''}">
            ${renderContent(props)}
</paper-toast>
`;

const closeButtonClassifier = 'close-btn';
const getOptionsStyles = (options: NotifyOptions) => options && options.styles ? options.styles :  {};

@customElement('notify-component')
export class NotifyComponent extends LitElement {
    render(){
        return html`${renderToast(this)} ${CSS}`;
    }

    updated(changedProps){
        let styles = getOptionsStyles(changedProps ? changedProps.options: undefined);
        styles.iconColor && this.closeButton && this.closeButton.style.setProperty('--iron-icon-fill-color', styles.iconColor);
        styles.textColor && this.toast && this.toast.style.setProperty('--paper-toast-color', styles.textColor);
        styles.backgroundColor && this.toast && this.toast.style.setProperty('--paper-toast-background-color', styles.backgroundColor);
    }

    @property({reflectToAttribute: true, type: Object})
    options: NotifyOptions;

    @listen('iron-overlay-closed', '#toast')
    onToastClosed(e) {
        this.dispatchEvent(new CustomEvent('closed'));
    }

    @listen('click', '.close-btn')
    closeToast(e) {
        this.toast.close();
    }

    @item('toast')
    toast: any;

    @item('action-btn')
    closeButton: HTMLElement;

    show() {
        this.toast.show();
    }

    close(){
        this.toast.close();
    }
}
