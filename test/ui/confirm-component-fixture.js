import * as sinon from 'sinon';
const assert = chai.assert;
const fixtureName = 'confirm-test-fixture';
const delay = (amount = 250) => new Promise(resolve => setTimeout(resolve, amount));
let confirmComponent;
let dialog;
suite('Given an instance of ConfirmComponent', () => {
    setup(async () => {
        confirmComponent = fixture(fixtureName);
        console.log(confirmComponent);
        dialog = confirmComponent.shadowRoot.querySelector('paper-dialog');
        await confirmComponent.updateComplete;
        confirmComponent.show();
    });
    test('should contain a paper dialog', async () => {
        assert.exists(dialog);
        await dialog;
    });
    suite('and `show` method is invoked', () => {
        test('should open dialog', async () => {
            assert.isTrue(dialog.opened);
            await dialog;
        });
    });
    suite('when setting options property', async () => {
        suite('and options.message is set', () => {
            test('should set paper-dialog text to options.message', async () => {
                const message = 'Hello, Im a custom message!!!';
                confirmComponent.options = { message: message };
                await confirmComponent.updateComplete;
                assert.equal(dialog.querySelector('#message').innerText, message);
            });
        });
        suite('and `showCloseButton` is set', () => {
            test('dialog should show a close button', async () => {
                confirmComponent.options = { message: 'dialog with close button', showCloseButton: true };
                await confirmComponent.updateComplete;
                assert.exists(dialog.querySelector('#close-btn'));
            });
            test('should close dialog if click on close btn', async () => {
                confirmComponent.options = { message: 'close dialog at click close-button', showCloseButton: true };
                await confirmComponent.updateComplete;
                let stub = sinon.stub(dialog, 'close');
                dialog.querySelector('#close-btn').click();
                assert.isTrue(stub.calledOnce);
            });
        });
        suite('when pass a type', () => {
            test('should add type attribute to paper-dialog component', async () => {
                const typeDanger = "danger";
                const typeWarning = "warning";
                const typeInfo = "info";
                const typeSuccess = "success";
                confirmComponent.options = { message: 'type danger dialog', type: typeDanger, showCloseButton: true };
                await confirmComponent.updateComplete;
                assert.isTrue(dialog.getAttribute('type') == typeDanger);
                dialog.close();
                confirmComponent.show();
                confirmComponent.options = { message: 'type warning dialog', type: typeWarning, showCloseButton: true };
                await confirmComponent.updateComplete;
                assert.isTrue(dialog.getAttribute('type') == typeWarning);
                dialog.close();
                confirmComponent.show();
                confirmComponent.options = { message: 'type info dialog', type: typeInfo, showCloseButton: true };
                await confirmComponent.updateComplete;
                assert.isTrue(dialog.getAttribute('type') == typeInfo);
                dialog.close();
                confirmComponent.show();
                confirmComponent.options = { message: 'type success dialog', type: typeSuccess, showCloseButton: true };
                await confirmComponent.updateComplete;
                assert.isTrue(dialog.getAttribute('type') == typeSuccess);
                dialog.close();
            });
        });
        suite('when pass a full-screen property', () => {
            test('should add fullScreen attribute to paper-dialog component', async () => {
                confirmComponent.options = { message: 'full screen dialog', fullScreen: true, showCloseButton: true };
                await confirmComponent.updateComplete;
                assert.isTrue(dialog.getAttribute('fullScreen') == "true");
                dialog.close();
            });
        });
        suite('when pass a styles property', () => {
            test('paper-dialog should update styles', async () => {
                const color1 = "blue";
                const color2 = "orange";
                const color3 = "yellow";
                const color4 = "red";
                const color5 = "white";
                const height1 = "40vh";
                const width1 = "40vw";
                const height2 = "80vh";
                const width2 = "80vw";
                confirmComponent.options = { message: 'custom styles dialog', showCloseButton: true, styles: { backgroundColor: color1, textColor: color2, closeIconColor: color3, acceptColor: color2, actionsBackgroundColor: color4, headerBackgroundColor: color2, width: width1, height: height1 } };
                await confirmComponent.updateComplete;
                let closeButton = dialog.querySelector('#close-btn');
                let actionButton = dialog.querySelector('#accept-btn');
                let actionsContainer = dialog.querySelector('#actions');
                let header = dialog.querySelector('#header');
                assert.isTrue(dialog.style.getPropertyValue('--paper-dialog-background-color') == color1);
                assert.isTrue(dialog.style.getPropertyValue('--paper-dialog-color') == color2);
                assert.isTrue(closeButton.style.getPropertyValue('--iron-icon-fill-color') == color3);
                assert.isTrue(actionButton.style.getPropertyValue('color') == color2);
                assert.isTrue(actionsContainer.style.getPropertyValue('background-color') == color4);
                assert.isTrue(header.style.getPropertyValue('background-color') == color2);
                assert.isTrue(dialog.style.getPropertyValue('width') == width1);
                assert.isTrue(dialog.style.getPropertyValue('height') == height1);
                dialog.close();
                confirmComponent.show();
                confirmComponent.options = { message: 'custom styles dialog', showCloseButton: true, styles: { backgroundColor: color4, textColor: color3, closeIconColor: color1, acceptColor: color5, actionsBackgroundColor: color1, headerBackgroundColor: color4, width: width2, height: height2 } };
                await confirmComponent.updateComplete;
                closeButton = dialog.querySelector('#close-btn');
                actionButton = dialog.querySelector('#accept-btn');
                actionsContainer = dialog.querySelector('#actions');
                assert.isTrue(dialog.style.getPropertyValue('--paper-dialog-background-color') == color4);
                assert.isTrue(dialog.style.getPropertyValue('--paper-dialog-color') == color3);
                assert.isTrue(closeButton.style.getPropertyValue('--iron-icon-fill-color') == color1);
                assert.isTrue(actionButton.style.getPropertyValue('color') == color5);
                assert.isTrue(actionsContainer.style.getPropertyValue('background-color') == color1);
                assert.isTrue(header.style.getPropertyValue('background-color') == color4);
                assert.isTrue(dialog.style.getPropertyValue('width') == width2);
                assert.isTrue(dialog.style.getPropertyValue('height') == height2);
            });
        });
        suite('when pass an accept and close labels property', () => {
            test('should display action buttons labels correctly', async () => {
                const acceptLabel = 'Aceptar';
                const cancelLabel = 'Cancelar';
                confirmComponent.options = { title: 'my title', message: 'my message', acceptLabel: acceptLabel, cancelLabel: cancelLabel };
                await confirmComponent.updateComplete;
                let cancelButton = dialog.querySelector('#cancel-btn');
                let acceptButton = dialog.querySelector('#accept-btn');
                assert.isTrue(acceptButton.innerText == acceptLabel.toUpperCase());
                assert.isTrue(cancelButton.innerText == cancelLabel.toUpperCase());
            });
        });
        suite('when pass modal property', () => {
            test('should set as value = true the properties: with-backdrop, no-cancel-on-outside-click and no-cancel-on-esc-key', async () => {
                confirmComponent.options = { title: 'my title', message: 'my message', modal: true };
                await confirmComponent.updateComplete;
                assert.isTrue(dialog.getAttribute('modal') == "true");
                assert.isTrue(dialog.modal == true);
                assert.isTrue(dialog.withBackdrop == true);
                assert.isTrue(dialog.noCancelOnOutsideClick == true);
                assert.isTrue(dialog.noCancelOnEscKey == true);
            });
        });
        suite('when pass headerDismiss property', () => {
            test('should close dialog when click on header', async () => {
                confirmComponent.options = { title: 'my title', message: 'my message', headerDismiss: true };
                await confirmComponent.updateComplete;
                let stub = sinon.stub(dialog, 'close');
                dialog.querySelector('#header').click();
                assert.isTrue(stub.calledOnce);
            });
        });
        suite('when pass withoutActions property', () => {
            test('shouldn\'t display action buttons', async () => {
                confirmComponent.options = { title: 'my title', message: 'my message', withoutActions: true };
                await confirmComponent.updateComplete;
                let actionButtons = dialog.querySelector('#actions');
                assert.notExists(actionButtons);
            });
        });
        suite('when dialog hides', () => {
            test('should raise `closed` event', async () => {
                let closed = false;
                confirmComponent.addEventListener('closed', () => closed = true);
                await confirmComponent.close(true);
                await delay();
                assert.isTrue(closed);
            });
        });
        suite('when provides a custom confirm component that implements confirm-mixin', () => {
            suite('when click on cancel button', () => {
                test('the event.detail should be false', async () => {
                    confirmComponent.options = { title: 'Dialog with custom component', type: "info", acceptLabel: 'Accept', showCloseButton: true, cancelLabel: 'Cancel', htmlUrl: '../test/ui/test-components/custom-confirm.js', htmlTag: 'custom-confirm', model: { arg: 'arg1' } };
                    await confirmComponent.updateComplete;
                    let cancelButton = confirmComponent.shadowRoot.querySelector('#cancel-btn');
                    assert.exists(cancelButton);
                    let eventSpy = sinon.spy();
                    confirmComponent.addEventListener('closed', eventSpy);
                    let stub = sinon.spy(confirmComponent, 'close');
                    await cancelButton.click();
                    assert.isTrue(stub.calledOnce);
                    assert.isTrue(eventSpy.calledOnce);
                    assert.isFalse(eventSpy.args[0][0].detail);
                });
            });
            suite('when click on accept button', () => {
                test('the event.detail should be true', async () => {
                    confirmComponent.options = { title: 'Dialog with custom component', type: "info", acceptLabel: 'Accept', showCloseButton: true, cancelLabel: 'Cancel', htmlUrl: '../test/ui/test-components/custom-confirm.js', htmlTag: 'custom-confirm', model: { arg: 'arg1' } };
                    await confirmComponent.updateComplete;
                    let acceptButton = confirmComponent.shadowRoot.querySelector('#accept-btn');
                    assert.exists(acceptButton);
                    let eventSpy = sinon.spy();
                    confirmComponent.addEventListener('closed', eventSpy);
                    let stub = sinon.spy(confirmComponent, 'close');
                    await acceptButton.click();
                    assert.isTrue(stub.calledOnce);
                    assert.isTrue(eventSpy.calledOnce);
                    assert.isTrue(eventSpy.args[0][0].detail);
                });
            });
            suite('when click on cancel button', () => {
                test('should not fire canAccept method', async () => {
                    confirmComponent.options = { title: 'Dialog with custom component', type: "info", acceptLabel: 'Accept', showCloseButton: true, cancelLabel: 'Cancel', htmlUrl: '../test/ui/test-components/custom-confirm.js', htmlTag: 'custom-confirm', model: { arg: 'arg1' } };
                    await confirmComponent.updateComplete;
                    let stub = { canAccept: sinon.stub().returns(Promise.resolve(false)) };
                    let eventSpy = sinon.spy();
                    sinon.stub(confirmComponent, 'getCustomComponent').returns(stub);
                    confirmComponent.addEventListener('close', eventSpy);
                    let cancelButton = confirmComponent.shadowRoot.querySelector('#cancel-btn');
                    let closeSpy = sinon.spy(confirmComponent, 'close');
                    await cancelButton.click();
                    assert.isFalse(stub.canAccept.called);
                    assert.isTrue(closeSpy.calledOnce);
                });
            });
            suite('when click on accept button', () => {
                suite('and custom component canAccept method returns false', () => {
                    test('should fire canAccept method but shouldn\'t fire dialog close method', async () => {
                        confirmComponent.options = { title: 'Dialog with custom component', type: "info", acceptLabel: 'Accept', showCloseButton: true, cancelLabel: 'Cancel', htmlUrl: '../test/ui/test-components/custom-confirm.js', htmlTag: 'custom-confirm', model: { arg: 'arg1' } };
                        let stub = { canAccept: sinon.stub().returns(Promise.resolve(false)) };
                        let eventSpy = sinon.spy();
                        sinon.stub(confirmComponent, 'getCustomComponent').returns(stub);
                        confirmComponent.addEventListener('close', eventSpy);
                        let acceptButton = confirmComponent.shadowRoot.querySelector('#accept-btn');
                        let closeSpy = sinon.spy();
                        dialog.addEventListener('close', closeSpy);
                        await acceptButton.click();
                        assert.isTrue(stub.canAccept.called);
                        assert.isFalse(closeSpy.called);
                    });
                });
                suite('and custom component canAccept method returns true', () => {
                    test('should fire canAccept method and should fire dialog close method', async () => {
                        confirmComponent.options = { title: 'Dialog with custom component', type: "info", acceptLabel: 'Accept', showCloseButton: true, cancelLabel: 'Cancel', htmlUrl: '../test/ui/test-components/custom-confirm.js', htmlTag: 'custom-confirm', model: { arg: 'arg1' } };
                        let stub = { canAccept: sinon.stub().returns(Promise.resolve(true)) };
                        let eventSpy = sinon.spy();
                        sinon.stub(confirmComponent, 'getCustomComponent').returns(stub);
                        confirmComponent.addEventListener('close', eventSpy);
                        let acceptButton = confirmComponent.shadowRoot.querySelector('#accept-btn');
                        let closeSpy = sinon.spy();
                        dialog.addEventListener('close', closeSpy);
                        await acceptButton.click();
                        assert.isTrue(stub.canAccept.called);
                        assert.isTrue(closeSpy.called);
                    });
                });
            });
        });
    });
});
//# sourceMappingURL=confirm-component-fixture.js.map