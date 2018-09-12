import {html} from '@polymer/lit-element/lit-element';
import '@polymer/iron-flex-layout/iron-flex-layout';
import {TemplateResult} from 'lit-html';
const innerStyle = html`
        <style>
                :host{
                    @apply --layout;
                    @apply --layout-center-center;
                    flex: 1;
                }
                paper-toast{
                    @apply --layout-horizontal;
                    @apply --layout-justified;
                    @apply --layout-center;
                    font-family: Roboto;
                    border-radius: 5px;
                }
                
                paper-toast.fit-bottom{
                    border-radius: 0;
                }
                
                paper-toast[type='danger']{
                     --paper-toast-background-color: #F44336;
                }
                
                paper-toast[type='warning']{
                     --paper-toast-background-color: #FF9800;
                }
                
                paper-toast[type='info']{
                     --paper-toast-background-color: #2196F3;
                }
                
                paper-toast[type='success']{
                     --paper-toast-background-color: #4CAF50;
                }
                
                paper-toast[position='top']{
                    position: absolute!important;
                    top: 0!important;
                }
                
                paper-toast[position='center']{
                    position: absolute!important;
                    left: auto !important;
                }
    </style>
`;
export const style: TemplateResult = innerStyle;