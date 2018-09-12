import {notify, NotifyOptions} from "../../src/notify";
import * as sinon from 'sinon';
import {doConfirm} from "../../src/confirm";

const {assert, expect} = chai;

const delay = (amount = 100) => new Promise(resolve => setTimeout(resolve, amount));

const mockComponentName = 'notify-component';
describe('When invoking `notify` method', () => {
    beforeEach(() => {
        (<any>document.body.querySelectorAll(mockComponentName)).forEach(c => document.body.removeChild(c));
        sinon.reset();
        sinon.restore();
    });
    const createStub = () => {
        let mock: any = document.createElement(mockComponentName);
        mock.show = sinon.stub();
        let createElement = document.createElement;
        let stub = sinon.stub(document, 'createElement').callsFake(function (name: string) {
            if (name === mockComponentName) {
                stub.restore();
                return mock;
            }
            return createElement(name);
        });
        return {stub, mock};
    };
    it('shoud add notify component to document body', async () => {
        const options = {message: 'hello'};
        let {stub, mock} = createStub();
        let p = notify(options);
        await delay();
        assert.exists(document.body.querySelector(mockComponentName));
        assert.isTrue(mock.show.calledOnce);
        assert.strictEqual(mock.options, options);
    });
    it('should remove notify component from document body when closed event was dispatched', async () => {
        const options = {message: 'hello'};
        let {stub, mock} = createStub();
        let resolved = false;
        let p = notify(options).then(() => resolved = true);
        await delay();
        mock.dispatchEvent(new CustomEvent('closed'));
        await delay();
        assert.isTrue(resolved);
        assert.notExists(document.body.querySelector(mockComponentName));
    });
    it('localize text when localize property is set', async () => {
        const message = 'my app title';
        const message2 = 'my app header';
        const options: NotifyOptions = {message: 'app.title', messageArgs: {opt1: 1}};
        let localizer = sinon.stub();
        localizer.onFirstCall().returns(message).onSecondCall().returns(message2);
        let stubs = createStub();
        let p = notify(options, localizer);
        assert.isTrue(localizer.calledOnce);
        let callArgs = localizer.args[0];
        assert.equal(callArgs[0], 'app.title');
        assert.deepEqual(callArgs[1], {opt1: 1});
        assert.deepEqual(stubs.mock.options, {message: message, messageArgs: {opt1: 1}});
        stubs = createStub();
        p = notify({message: 'app.header', messageArgs: {opt: 2}}, localizer);
        assert.isTrue(localizer.calledTwice);
        callArgs = localizer.args[1];
        assert.equal(callArgs[0], 'app.header');
        assert.deepEqual(callArgs[1], {opt: 2});
        assert.deepEqual(stubs.mock.options, {message: message2, messageArgs: {opt: 2}});
    });
    it('should not localize if no localizer supplied', () =>{
        let {mock} = createStub();
        let options = {message: 'app.title', messageArgs: {p1: 1}};
        notify(options);
        assert.deepEqual(mock.options, options);
    });
    it('should not localize if no message supplied', () =>{
        let {mock} = createStub();
        let options = <any>{htmlTag: 'any'};
        let localizer = sinon.stub();
        localizer.returns('hello ');
        notify(options, localizer);
        assert.isFalse(localizer.called);
    });
    it('should throw error if no message and no htmlTag supplied', () =>{
        expect(() => notify({})).throw;
    });
    it('should import custom component and set model property', async() =>{
        let p = notify({title: 'Notify with custom component', htmlUrl: '../test/ui/test-components/custom-notify.js', htmlTag: 'custom-notify', model: {arg: 'arg1'}});
        await delay(1000);
        assert.exists(customElements.get('custom-notify'));
        let dialog = document.body.querySelector('notify-component').shadowRoot.querySelector('paper-toast');
        let customNotify: any = dialog.querySelector('custom-notify');
        assert.exists(customNotify);
        assert.deepEqual(customNotify.model, {arg: 'arg1'});
    });
});
