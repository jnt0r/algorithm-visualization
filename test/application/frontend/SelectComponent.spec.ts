import SelectComponent from '../../../src/application/frontend/components/SelectComponent';

describe('SelectComponent', () => {
    const testId = 'testId';
    const element = document.createElement('select');
    element.setAttribute('id', testId);
    document.body.appendChild(element);
    let component: SelectComponent<string>;

    beforeEach(() => {
        component = new SelectComponent<string>(testId);
    });

    it('should return undefined if no element added', () => {
        expect(component.getSelectedItem()).toBeUndefined();
    });

    it('should select first added item by default', () => {
        component.addItem('testString');
        component.addItem('testString2');
        component.addItem('testString3');
        expect(component.getSelectedItem()).toBe('testString');
    });

    it('should return selected item', () => {
        component.addItem('testString');
        component.addItem('anotherString');
        element.value = 'anotherString';
        expect(component.getSelectedItem()).toBe('anotherString');
    });
});
