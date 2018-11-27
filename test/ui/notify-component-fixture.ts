import {NotifyComponent} from "../../src/components/notify-component";
import * as sinon from 'sinon';
const assert = chai.assert;
const fixtureName = 'test-fixture';
const delay = (amount = 250) => new Promise(resolve => setTimeout(resolve, amount));
let notifyComponent: NotifyComponent;
let toast: any;
suite('Given an instance of NotifyComponent', () =>{
    setup(async() =>{
        notifyComponent = fixture(fixtureName);
        toast = notifyComponent.shadowRoot.querySelector('paper-toast');
        notifyComponent.show();
        await notifyComponent.updateComplete;
    });
    test('should contain a paper toast', async() =>{
        assert.exists(toast);
        await toast;
    });
    suite('and `show` method is invoked', () =>{
       test('should open toast', async() =>{
           assert.isTrue(toast.opened);
           await toast;
       })
    });
    suite('when setting options property', async() =>{
        suite('and options.message is set', () => {
            test('should set paper-toast text to options.message', async() =>{
                const message = 'Hello, Im a custom message!!!';
                notifyComponent.options = {message: message};
                await notifyComponent.updateComplete;
                assert.equal(toast.text, message);
            });
        });
        suite('and `showCloseButton` is set', () =>{

           test('toast should show a close button', async () =>{
               notifyComponent.options={message: 'toast with close button', showCloseButton: true};
               await notifyComponent.updateComplete;
               assert.exists(toast.querySelector('#action-btn'));
           });

           /*test('should close toast if click on close btn', async() =>{
               notifyComponent.options={message: 'close toast at click close-button', showCloseButton: true};
               await notifyComponent.updateComplete;
               let stub = sinon.stub(toast, 'close');
               toast.querySelector('#action-btn').click();
               assert.isTrue(stub.calledOnce);
               await notifyComponent.updateComplete;
           })*/
        });
        suite('when pass a type', ()=>{
            test('should add type attribute to paper-toast component', async()=>{
                const typeDanger = "danger";
                const typeWarning = "warning";
                const typeInfo = "info";
                const typeSuccess = "success";

                notifyComponent.options = {message: 'type danger toast', type: typeDanger, showCloseButton: true};
                await notifyComponent.updateComplete;
                assert.isTrue(toast.getAttribute('type') == typeDanger);
                toast.close();

                notifyComponent.show();
                notifyComponent.options = {message: 'type warning toast', type: typeWarning, showCloseButton: true};
                await notifyComponent.updateComplete;
                assert.isTrue(toast.getAttribute('type') == typeWarning);
                toast.close();

                notifyComponent.show();
                notifyComponent.options = {message: 'type info toast', type: typeInfo, showCloseButton: true};
                await notifyComponent.updateComplete;
                assert.isTrue(toast.getAttribute('type') == typeInfo);
                toast.close();

                notifyComponent.show();
                notifyComponent.options = {message: 'type success toast', type: typeSuccess, showCloseButton: true};
                await notifyComponent.updateComplete;
                assert.isTrue(toast.getAttribute('type') == typeSuccess);
                toast.close();

            });
        });
        suite('when pass a position', ()=>{
            test('should position attribute to paper-toast component', async()=>{
                const positionTop = "top";
                const positionCenter = "center";
                const positionBottom = "bottom";

                notifyComponent.options = {message: 'position top toast', position: positionTop, showCloseButton: true};
                await notifyComponent.updateComplete;
                assert.isTrue(toast.getAttribute('position') == positionTop);
                toast.close();

                notifyComponent.show();
                notifyComponent.options = {message: 'position center toast', position: positionCenter, showCloseButton: true};
                await notifyComponent.updateComplete;
                assert.isTrue(toast.getAttribute('position') == positionCenter);
                toast.close();

                notifyComponent.show();
                notifyComponent.options = {message: 'position bottom toast', position: positionBottom, showCloseButton: true};
                await delay();
                assert.isTrue(toast.getAttribute('position') == positionBottom);
            });
        });
        suite('when pass a styles property', ()=>{
            test('paper-toast should update styles', async()=>{
                const color1 = "blue";
                const color2 = "orange";
                const color3 = "yellow";
                const color4 = "red";
                const color5 ="white";

                notifyComponent.options = {message: 'custom styles toast', showCloseButton: true, styles: {backgroundColor: color1, textColor: color2, iconColor: color3} };
                await notifyComponent.updateComplete;
                let button = toast.querySelector('#action-btn');
                assert.isTrue(toast.style.getPropertyValue('--paper-toast-background-color') == color1);
                assert.isTrue(toast.style.getPropertyValue('--paper-toast-color') == color2);
                assert.isTrue(button.style.getPropertyValue('--iron-icon-fill-color') == color3);
                toast.close();

                notifyComponent.show();
                notifyComponent.options = {message: 'custom styles toast', showCloseButton: true, styles: {backgroundColor: color4, textColor: color5, iconColor: color1} };
                await notifyComponent.updateComplete;
                assert.isTrue(toast.style.getPropertyValue('--paper-toast-background-color') == color4);
                assert.isTrue(toast.style.getPropertyValue('--paper-toast-color') == color5);
                assert.isTrue(button.style.getPropertyValue('--iron-icon-fill-color') == color1);
            });
        });
        suite('when pass a delay property', () =>{
            test('paper toast should have a "duration" property ', async() =>{
                const time = 0;
                notifyComponent.options = {message: 'custom styles toast', showCloseButton: true, delay: time };
                await notifyComponent.updateComplete;
                assert.isTrue(toast.getAttribute('duration') == time);
            });
        });
        suite('when pass a classifier', async() =>{
            test('paper-toast should have a classifier class', async() =>{
                const className = 'fit-bottom';
                notifyComponent.options = {message: 'toast with "fit-bottom" classifier', showCloseButton: true, classifiers: [className]};
                await notifyComponent.updateComplete;
                assert.isTrue(toast.classList.contains(className));
            });
        });
    });

    suite('when toast hides', () =>{
        test('should raise `closed` event', async() =>{
           let closed = false;
           notifyComponent.addEventListener('closed', () => closed = true);
           toast.dispatchEvent(new CustomEvent('iron-overlay-closed'));
           await delay();
           assert.isTrue(closed);
        });
    });
});