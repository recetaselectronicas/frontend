import React from 'react';
import { shallow } from 'enzyme';
import AddItemDialog from './AddItemDialog';

const sinon = require('sinon');

const props = {
};
const setup = (anotherProps = {}) => {
  const newProps = {
    ...props,
    ...anotherProps,
  };
  const wrapper = shallow(<AddItemDialog {...newProps} />);
  return {
    wrapper,
    instance: wrapper.instance(),
    itemTexfield: wrapper.find('.add-item__item-texfield'),
    quantityTexfield: wrapper.find('.add-item__quantity-texfield'),
    Suggestions: wrapper.find('Suggestions'),
    confirmButton: wrapper.find('.add-item__confirm-button'),
  };
};

describe('<AddItemDialog />', () => {
  const sandbox = sinon.createSandbox();
  it('smoke test', () => {
    const { wrapper } = setup();
    expect(wrapper.exists()).toBe(true);
  });
  describe('basic render', () => {
    const { confirmButton } = setup();
    it('confirm button is disabled', () => {
      expect(confirmButton.props().disabled).toBe(true);
    });
  });
  describe('when write in item button', () => {
    const suggestionValue = 'ibuprofeno';
    const itemSuggestion = {
      label: suggestionValue,
    };
    const responseSearchMedicament = {
      result: [itemSuggestion],
    };
    const searchMedicamentSpy = sandbox.stub().resolves(
      responseSearchMedicament,
    );
    const addItemSpy = sandbox.spy();
    const { wrapper, itemTexfield, quantityTexfield } = setup({ searchMedicament: searchMedicamentSpy, addItem: addItemSpy });
    const inputValue = 'random text';
    const quantityValue = 4;

    itemTexfield.simulate('change', { target: { value: inputValue } });

    it('call searchMedicament with this value', () => {
      expect(searchMedicamentSpy.calledWith(inputValue)).toBe(true);
    });

    it('show suggestion', () => {
      const Suggestions = wrapper.find('Suggestions');
      expect(Suggestions).toHaveLength(1);
    });
    it('populate the prop suggestion with the result of searchMedicament', () => {
      const Suggestions = wrapper.find('Suggestions');
      expect(Suggestions.props().data).toEqual(responseSearchMedicament.result);
    });

    describe('and select a suggestion', () => {
      beforeAll(() => {
        const Suggestion = wrapper.find('Suggestions').dive().find('Suggestion');
        Suggestion.dive().simulate('click');
      });
      it('put the value of this on the input', () => {
        const texfieldMuttated = wrapper.find('.add-item__item-texfield');
        expect(texfieldMuttated.props().value).toEqual(suggestionValue);
      });
      it('confirm button is enabled ', () => {
        const confirmButton = wrapper.find('.add-item__confirm-button');
        expect(confirmButton.props().disabled).toBe(false);
      });
    });
    describe('and write in quantity input', () => {
      beforeAll(() => {
        quantityTexfield.simulate('change', { target: { value: quantityValue } });
      });

      it('put into this value', () => {
        const quantityTexfieldMutted = wrapper.find('.add-item__quantity-texfield');
        expect(quantityTexfieldMutted.props().value).toEqual(quantityValue);
      });
    });
    describe('and click confirm button', () => {
      beforeAll(() => {
        const confirmButton = wrapper.find('.add-item__confirm-button');
        confirmButton.simulate('click');
      });
      it('call addItem prop', () => {
        expect(addItemSpy.getCall(0).args[0]).toEqual({
          item: itemSuggestion,
          quantity: quantityValue,
        });
      });
    });
  });
});
