import {html, LitElement} from "@polymer/lit-element";
import {customElement, item, listen, property} from "@uxland/uxl-polymer2-ts";
import {ConfirmOptions, ConfirmStyles} from "../confirm";
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-dialog/paper-dialog';
import '@polymer/paper-button/paper-button';
import '@polymer/paper-icon-button/paper-icon-button';
import {style as styleTemplate} from './confirm-component-styles.js';
import {IConfirmMixin} from "../confirm-mixin";

const renderCloseButton = (show: boolean) => show ? html`
                        <paper-icon-button
                            id="close-btn"     
                            icon="icons:close">  
                        </paper-icon-button>` : undefined;

const renderActions = (options: ConfirmOptions) => !options.withoutActions ? html `
                        <div id="actions">
                            <paper-button id="cancel-btn">${options.cancelLabel}</paper-button>
                            <paper-button id="accept-btn" autofocus>${options.acceptLabel}</paper-button>
                        </div>` : undefined;
const renderMessage = (options: ConfirmOptions) => html`<div id="message">${options.message || ''}</div>` ;
const renderCustomContent = (options: ConfirmOptions, props: ConfirmComponent) => {
    if(options.htmlTag){
        let component = document.createElement(options.htmlTag);
        component.setAttribute('id', '__custom-element__');
        component.addEventListener('closed', props.componentCloseRequest.bind(props));
        return html `${component}`;
    }
    return html ``;
};
const renderContent = (options: ConfirmOptions, props: ConfirmComponent) => options.message ? renderMessage(options) : renderCustomContent(options, props);

const renderDialog = (options: ConfirmOptions, props: ConfirmComponent) => html`
    <paper-dialog id="dialog" type$="${options.type}" fullScreen$="${options.fullScreen}" modal$="${options.modal}">
    <div id="header">
        <h2>${options.title || ''}</h2>
        ${renderCloseButton(options.showCloseButton)}
    </div>
    <div id="content">
        <paper-dialog-scrollable>
            ${renderContent(options, props)} 
        </paper-dialog-scrollable>
        ${renderActions(options)}
    </div>
</paper-dialog>
`;

const getOptionsStyles = (options: ConfirmOptions) => options && options.styles ? options.styles :  {};

@customElement('confirm-component')
export class ConfirmComponent extends LitElement {
    @property({reflectToAttribute: true, type: Object})
    options: ConfirmOptions;

    @item('dialog')
    dialog: any;

    @listen('click', '#cancel-btn')
    onCancelClick(e){
        this.close(false);
    }

    @listen('click', '#close-btn')
    closeDialog(e) {
        this.close(false);
    }

    @listen('click', '#accept-btn')
    onAcceptClick(e){
        this.close(true);
    }
    componentCloseRequest(e: CustomEvent){
        this.close(e.detail);
    }

    async close(result: boolean){
        if(result){
            let component = this.getCustomComponent();
            if(component && component.canAccept){
                let canAccept = await component.canAccept();
                if(!canAccept)
                    return;
                if(component.accept){
                    await component.accept();
                }
            }
        }
        this.dialog.close();
        this.dispatchEvent(new CustomEvent('closed', {detail: result}));
    }

    @listen('click', '#header')
    onHeaderClick(e){
        this.options.headerDismiss && this.close(false);
    }

    getCustomComponent() : IConfirmMixin{
        return this.shadowRoot.querySelector('#__custom-element__') as IConfirmMixin;
    }

    @item('close-btn')
    closeButton: HTMLElement;

    @item('accept-btn')
    acceptButton: HTMLElement;

    @item('actions')
    actionsContainer: HTMLElement;

    @item('header')
    header: HTMLElement;

    @item('content')
    content: HTMLElement;

    _render(props: ConfirmComponent) : any{
        let options = props.options || {};
        return html`
            ${styleTemplate}
            ${renderDialog(options, this)}
        `;
    }

    show(){
        this.dialog.open();
    }

    _didRender(props: ConfirmComponent, changedProps: ConfirmComponent, prevProps: ConfirmComponent){
        let styles : ConfirmStyles= getOptionsStyles(changedProps ? changedProps.options: undefined);
        styles.textColor && this.dialog && this.dialog.style.setProperty('--paper-dialog-color', styles.textColor);
        styles.backgroundColor && this.dialog && this.dialog.style.setProperty('--paper-dialog-background-color', styles.backgroundColor);
        styles.closeIconColor && this.closeButton && this.closeButton.style.setProperty('--iron-icon-fill-color', styles.closeIconColor);
        styles.acceptColor && this.acceptButton && this.acceptButton.style.setProperty('color', styles.acceptColor);
        styles.actionsBackgroundColor && this.actionsContainer && this.actionsContainer.style.setProperty('background-color', styles.actionsBackgroundColor);
        styles.headerBackgroundColor && this.header && this.header.style.setProperty('background-color', styles.headerBackgroundColor);
        styles.width && this.dialog && this.dialog.style.setProperty('width', styles.width);
        styles.height && this.dialog && this.dialog.style.setProperty('height', styles.height);
        styles.height && this.content && this.content.style.setProperty('height', 'calc(100% - 64px)');
    }
}