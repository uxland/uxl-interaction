import {html} from '@polymer/lit-element/lit-element';
import '@polymer/iron-flex-layout/iron-flex-layout';
import {TemplateResult} from 'lit-html';
const innerStyle = html`
    <style>
            paper-dialog{
                width: 40vw;
                height: auto;
                border-radius: 8px;
            }
            
            #header{
                @apply --layout-horizontal;
                @apply --layout-justified;
                @apply --layout-center;
                height: 64px;
                margin: 0;
                padding: 0;
                border-top-left-radius: 8px;
                border-top-right-radius: 8px;
            }
            
            #header h2{
                padding: 0 24px;
                font-weight: 400;
            }
            
            #header paper-icon-button{
                margin-right: 16px;
            }
            
            #content{
                @apply --layout-vertical;
                @apply --layout-justified;
                margin: 0;
                padding: 0;
                flex: 1;
            }
            
            paper-dialog-scrollable{
                @apply --layout-vertical;
                padding: 24px;
            }
            
            #actions{
                @apply --layout-horizontal;
                @apply --layout-end-justified;
                margin: 8px 0;
                padding: 0 8px 0 0;
            }
            
            paper-dialog[fullScreen]{
                @apply --layout-vertical;
                position: fixed;
                top: 0;
                left: 0;
                margin: 0;
                width: 100%;
                height: 100%;
            }
                        
            paper-dialog[fullScreen], paper-dialog[fullScreen] #header{
                border-radius: 0;
            }
            
            paper-dialog[type="info"] #header{
                background-color: #2196F3;
                color: #fff;
            }
            
            paper-dialog[type="info"] #accept-btn{
                color: #2196F3;
            }
            
            paper-dialog[type="danger"] #header{
                background-color: #F44336;
                color: #fff;
            }
            
            paper-dialog[type="danger"] #accept-btn{
                color: #F44336;
            }
            
            paper-dialog[type="warning"] #header{
                background-color: #FF9800;
                color: #fff;
            }
            
            paper-dialog[type="warning"] #accept-btn{
                color: #FF9800;
            }
            
            paper-dialog[type="success"] #header{
                background-color: #4CAF50;
                color: #fff;
            }
            
            paper-dialog[type="success"] #accept-btn{
                color: #4CAF50;
            }                     
</style>`;

export const style: TemplateResult = innerStyle;