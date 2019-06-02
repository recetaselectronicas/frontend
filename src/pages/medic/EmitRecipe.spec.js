import React from 'react';
import { shallow } from 'enzyme';
import EmitRecipe from './EmitRecipe';

const props = {};

const getAffilateTextfield = wrapper => wrapper.find('.emit-recipe__affilate-textfield');
const setup = (anotherProps = {}) => {
  const newProps = {
    ...props,
    ...anotherProps,
  };
  const wrapper = shallow(<EmitRecipe {...newProps} />);
  return {
    wrapper,
    instance: wrapper.instance(),
    addItemButton: wrapper.find('.emit-recipe__add-item'),
    AddItemDialog: wrapper.find('AddItemDialog'),
    Item: wrapper.find('Item'),
    medicalInsuranceSelect: wrapper.find('.emit-recipe__medical-insurance-select'),
    affiliateTextfield: getAffilateTextfield(wrapper),
    emitRecipeButton: wrapper.find('.emit-recipe__button'),
  };
};

describe('<EmitRecipe />', () => {
  it('smoke test', () => {
    const { wrapper } = setup();
    expect(wrapper.exists()).toBe(true);
  });
  describe('initial render', () => {
    const { affiliateTextfield, emitRecipeButton } = setup();
    it('emit button is disabled', () => {
      expect(emitRecipeButton.props().disabled).toBe(true);
    });
    it('affiliateTextfield is disabled', () => {
      expect(affiliateTextfield.props().disabled).toBe(true);
    });
  });
  describe('when execute addItem', () => {
    const { wrapper, AddItemDialog } = setup();
    const itemToAdd = {
      label: 'ibuprofeno',
    };
    const quantity = 5;
    const addItemExecution = {
      item: itemToAdd,
      quantity,
    };
    beforeAll(() => {
      AddItemDialog.props().addItem(addItemExecution);
    });
    it('add a item to the list', () => {
      const items = wrapper.find('Item');
      expect(items).toHaveLength(1);
    });
    describe('and remove this item', () => {
      beforeAll(() => {
        const items = wrapper.find('Item');
        items
          .at(0)
          .props()
          .removeItem(0);
      });
      it('remove this item', () => {
        const items = wrapper.find('Item');
        expect(items).toHaveLength(0);
      });
    });
  });

  describe('when click add item button', () => {
    const { addItemButton, wrapper } = setup({});
    beforeAll(() => {
      addItemButton.simulate('click');
    });
    it('open add item modal', () => {
      const modalAddItem = wrapper.find('AddItemDialog');
      expect(modalAddItem.props().open).toBe(true);
    });
  });

  describe('when write in affilate textfield', () => {
    const { wrapper, medicalInsuranceSelect, affiliateTextfield } = setup();
    const changeValue = 2131221312312;
    beforeAll(() => {
      affiliateTextfield.simulate('change', { target: { value: changeValue } });
    });
    it('set the value into the input', () => {
      const affiliateTextfieldMuttated = getAffilateTextfield(wrapper);
      expect(affiliateTextfieldMuttated.props().value).toEqual(changeValue);
    });
    describe('and select a medical insurance', () => {
      beforeAll(() => {
        medicalInsuranceSelect.simulate('change', { target: { value: 1 } });
      });
      it('clean affiliate textfield', () => {
        const affiliateTextfieldMuttated = getAffilateTextfield(wrapper);
        expect(affiliateTextfieldMuttated.props().value).toEqual('');
      });
      it('enable affiliate textfield ', () => {
        const affiliateTextfieldMuttated = getAffilateTextfield(wrapper);
        expect(affiliateTextfieldMuttated.props().disabled).toBe(false);
      });
    });
  });
});
