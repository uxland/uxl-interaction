import * as sinon from 'sinon';
import { doConfirm } from "../../src/confirm";
import { notify } from "../../src/notify";
const { assert, expect } = chai;
const delay = (amount = 100) => new Promise(resolve => setTimeout(resolve, amount));
const mockComponentName = 'confirm-component';
describe('When invoking `confirm` method', () => {
    beforeEach(() => {
        document.body.querySelectorAll(mockComponentName).forEach(c => document.body.removeChild(c));
        sinon.reset();
        sinon.restore();
    });
    const createStub = () => {
        let mock = document.createElement(mockComponentName);
        mock.show = sinon.stub();
        let createElement = document.createElement;
        let stub = sinon.stub(document, 'createElement').callsFake(function (name) {
            if (name === mockComponentName) {
                stub.restore();
                return mock;
            }
            return createElement(name);
        });
        return { stub, mock };
    };
    it('should add confirm component to document body', async () => {
        let options = { title: 'my title', message: 'my message' };
        let { stub, mock } = createStub();
        let p = doConfirm(options);
        await mock.updateComplete;
        assert.exists(document.body.querySelector(mockComponentName));
        assert.isTrue(mock.show.calledOnce);
        assert.strictEqual(mock.options, options);
    });
    it('should remove confirm-component from document body when closed event was dispatched', async () => {
        const options = { title: 'my title', message: 'hello from dialog' };
        let { stub, mock } = createStub();
        let resolved = false;
        let p = doConfirm(options).then(() => resolved = true);
        await delay();
        mock.dispatchEvent(new CustomEvent('closed'));
        await delay();
        assert.isTrue(resolved);
        assert.notExists(document.body.querySelector(mockComponentName));
    });
    it('localize text when localize property is set', async () => {
        const title1 = 'my app title 1';
        const title2 = 'my app title 2';
        const message1 = 'my message 1';
        const message2 = 'my message 2';
        const options = { title: 'app.title', message: 'app.message', titleArgs: { titleArg1: 1 }, messageArgs: { messageArg1: 1 } };
        const options2 = { title: 'component.title', message: 'component.message', titleArgs: { titleArg1: 2 }, messageArgs: { messageArg1: 2 } };
        let localizer = sinon.stub();
        localizer.onFirstCall().returns(title1).onSecondCall().returns(message1).onThirdCall().returns(title2).onCall(3).returns(message2);
        let stubs = createStub();
        let result = doConfirm(options, localizer);
        assert.isTrue(localizer.calledTwice);
        let messageCallArgs = localizer.args[0];
        assert.equal(messageCallArgs[0], 'app.title');
        assert.deepEqual(messageCallArgs[1], { titleArg1: 1 });
        let titleCallArgs = localizer.args[1];
        assert.equal(titleCallArgs[0], 'app.message');
        assert.deepEqual(titleCallArgs[1], { messageArg1: 1 });
        assert.deepEqual(stubs.mock.options, { title: title1, message: message1, titleArgs: { titleArg1: 1 }, messageArgs: { messageArg1: 1 } });
        stubs = createStub();
        result = doConfirm(options2, localizer);
        assert.isTrue(localizer.callCount == 4);
        messageCallArgs = localizer.args[2];
        assert.equal(messageCallArgs[0], 'component.title');
        assert.deepEqual(messageCallArgs[1], { titleArg1: 2 });
        titleCallArgs = localizer.args[3];
        assert.equal(titleCallArgs[0], 'component.message');
        assert.deepEqual(titleCallArgs[1], { messageArg1: 2 });
        assert.deepEqual(stubs.mock.options, { title: title2, message: message2, titleArgs: { titleArg1: 2 }, messageArgs: { messageArg1: 2 } });
    });
    it('should not localize if no localizer supplied', () => {
        let { mock } = createStub();
        let options = { title: 'app.title', message: 'app.message', titleArgs: { arg1: 1 }, messageArgs: { p1: 1 } };
        doConfirm(options);
        assert.deepEqual(mock.options, options);
    });
    it('should not localize if no message and no title supplied', () => {
        let { mock } = createStub();
        let options = { htmlTag: 'div' };
        let localizer = sinon.stub();
        localizer.returns('hello');
        doConfirm(options, localizer);
        assert.isFalse(localizer.called);
    });
    it('should throw error if no message and no htmlTag supplied', () => {
        expect(() => notify({})).throw;
    });
    it('should import custom component and set model property', async () => {
        let p = doConfirm({ title: 'Dialog with custom component', type: "info", acceptLabel: 'Accept', cancelLabel: 'Cancel', htmlUrl: '../test/ui/test-components/custom-confirm.js', htmlTag: 'custom-confirm', model: { arg: 'arg1' } });
        await delay(1000);
        assert.exists(customElements.get('custom-confirm'));
        let dialog = document.body.querySelector('confirm-component').shadowRoot.querySelector('paper-dialog');
        let customConfirm = dialog.querySelector('custom-confirm');
        assert.exists(customConfirm);
        assert.deepEqual(customConfirm.model, { arg: 'arg1' });
    });
});
//# sourceMappingURL=confirm.spec.js.map