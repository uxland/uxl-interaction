declare type Localizer = (key: string, ...args: any[]) => string;
import './components/notify-component';
import {invariant} from '@uxland/uxl-utilities/invariant';
export interface NotifyOptions<T = any> {
    message?: string;
    messageArgs?: Object;
    htmlTag?: string;
    htmlUrl?: string;
    delay?: number;
    showCloseButton?: boolean;
    type?: NotifyType;
    position?: NotifyPosition;
    styles?: NotifyStyles;
    classifiers?: NofifyClassifiers[];
    model?: T;
}

export interface NotifyStyles{backgroundColor?: string, textColor?: string, iconColor?: string};
export type NotifyPosition = 'bottom' | 'center' | 'top';
export type NotifyType = 'danger' | 'warning' | 'info' | 'success';
export type NofifyClassifiers = 'fit-bottom';

export const notify = async(options: NotifyOptions, localizer?: Localizer): Promise<any> => {
    invariant(options.message || options.htmlTag, 'message or htmlTag options properties are required');
    return new Promise<any>(async(resolve) =>{
        const componentName = 'notify-component';
        const component: any  = document.body.appendChild(document.createElement(componentName));
        if(localizer && options.message)
            options = {...options, message: localizer(options.message, {...options.messageArgs})};

        if(options.htmlTag && options.htmlUrl)
            await import(options.htmlUrl);

        component.options = options;

        if(options.htmlTag){
            await component.renderComplete;
            let customComponent = component.shadowRoot.querySelector(`#__custom-element__`);
            customComponent.model = options.model;
        }

        component.options && component.show();
        component.addEventListener('closed', closeComponent);
        function closeComponent(){
            component.remove();
            resolve(true);
        }
    });
};
