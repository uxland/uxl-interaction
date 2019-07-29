import { getViewOptions, registerView, unregisterView } from "../src/view-registry";
const assert = chai.assert;
const viewOptions = { classifiers: 'classifiers', headerIcon: 'my-icon', parentClassifiers: 'parentClassifiers', parentSettings: {}, tag: 'my-view', url: 'my-view.html' };
suite('view registry fixture', () => {
    test('register view', () => {
        const options = registerView('my-view', viewOptions);
        assert.deepEqual(options, viewOptions);
        assert.strictEqual(options, getViewOptions('my-view'));
    });
    test('unregister view', () => {
        registerView('my-view', viewOptions);
        const result = unregisterView('my-view');
        assert.isUndefined(result);
        assert.isUndefined(getViewOptions('my-view'));
    });
});
//# sourceMappingURL=view-registry-fixture.js.map