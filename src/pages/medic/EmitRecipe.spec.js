import React from 'react';
import { shallow } from 'enzyme';
import EmitRecipe from './EmitRecipe';

const props = {
};
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
  };
};

describe('<EmitRecipe />', () => {
  it('smoke test', () => {
    const { wrapper } = setup();
    expect(wrapper.exists()).toBe(true);
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
        items.at(0).props().removeItem(0);
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
});
