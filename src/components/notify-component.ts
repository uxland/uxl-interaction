import {customElement, item, listen, property} from "@uxland/uxl-polymer2-ts"
import {html, LitElement} from '@polymer/lit-element/lit-element';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-toast/paper-toast.js';
import {NotifyOptions} from "../notify";
import {style as styleTemplate} from './notify-component-styles.js';

const renderCloseButton = (show: boolean, classifier: any) => show ? html`
                        <paper-icon-button
                            id="action-btn"     
                            class$="${classifier}" 
                            icon="icons:close">  
                        </paper-icon-button>` : undefined;

const renderCustomContent = (options: NotifyOptions, props: NotifyComponent) => {
    if(options.htmlTag){
        let component = document.createElement(options.htmlTag);
        component.setAttribute('id', '__custom-element__');
        component.addEventListener('close', props.close);
        return html `${component}`;
    }
};

const renderContent = (options: NotifyOptions, props: NotifyComponent) => options.message ? renderCloseButton(options.showCloseButton, options.classifiers) : renderCustomContent(options, props);

const renderToast = (options: NotifyOptions, props: NotifyComponent) => html`
<paper-toast
            id="toast" 
            class$="${(options.classifiers || []).map(item => item)}"
            position$="${options.position}" 
            duration$="${options.delay}"
            type$="${options.type}" 
            text="${options.message || ''}">
            ${renderContent(options, props)}
</paper-toast>
`;

const closeButtonClassifier = 'close-btn';
const getOptionsStyles = (options: NotifyOptions) => options && options.styles ? options.styles :  {};

@customElement('notify-component')
export class NotifyComponent extends LitElement {
    @property({reflectToAttribute: true, type: Object})
    options: NotifyOptions;

    @listen('iron-overlay-closed', '#toast')
    onToastClosed(e) {
        this.dispatchEvent(new CustomEvent('closed'));
    }

    @listen('click', `.${closeButtonClassifier}`)
    closeToast(e) {
        this.toast.close();
    }

    @item('toast')
    toast: any;

    @item('action-btn')
    closeButton: HTMLElement;

    _render(props: NotifyComponent): any {
        let options = props.options || {};
        return html`
        ${renderToast(options, props)}
        ${styleTemplate}
        `;
    }

    show() {
        this.toast.show();
    }

    close(){
        this.toast.close();
    }

    _didRender(props: NotifyComponent, changedProps: NotifyComponent, prevProps: NotifyComponent){
        let styles = getOptionsStyles(changedProps ? changedProps.options: undefined);
        styles.iconColor && this.closeButton && this.closeButton.style.setProperty('--iron-icon-fill-color', styles.iconColor);
        styles.textColor && this.toast && this.toast.style.setProperty('--paper-toast-color', styles.textColor);
        styles.backgroundColor && this.toast && this.toast.style.setProperty('--paper-toast-background-color', styles.backgroundColor);
    }
}
