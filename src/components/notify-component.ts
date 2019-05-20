import {customElement, query, property} from "lit-element/lib/decorators";
import {html, LitElement} from 'lit-element/lit-element';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-toast/paper-toast.js';
import {NotifyOptions} from "../notify";
import CSS from './notify-component-styles';

const renderCloseButton = (props: NotifyComponent) => props.options.showCloseButton
    ? html`<paper-icon-button 
                @click="${props.closeToast}" 
                id="action-btn" 
                class="close-btn ${props.options.classifiers}" 
                icon="icons:close">
           </paper-icon-button>`
    : html ``;

const renderCustomContent = (props: NotifyComponent) => {
    if(props.options.htmlTag){
        let component = document.createElement(props.options.htmlTag);
        component.setAttribute('id', '__custom-element__');
        component.addEventListener('close', props.close);
        return html `${component}`;
    }
};

const renderContent = (props: NotifyComponent) => props.options.message
    ? renderCloseButton(props)
    : renderCustomContent(props);

const renderToast = (props: NotifyComponent) => html`
<paper-toast
        id="toast" 
        class="${(props.options.classifiers || []).map(item => item)}"
        position="${props.options.position}" 
        .duration="${props.options.delay}"
        type="${props.options.type}"
        @iron-overlay-closed="${props.toastClosed}" 
        .text="${props.options.message || ''}">
        ${renderContent(props)}
</paper-toast>
`;

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

    toastClosed(e) {
        this.dispatchEvent(new CustomEvent('closed'));
    }

    closeToast(e) {
        this.toast.close();
    }

    @query('#toast')
    toast: any;

    @query('#action-btn')
    closeButton: HTMLElement;

    show() {
        this.toast.show();
    }

    close(){
        this.toast.close();
    }
}
