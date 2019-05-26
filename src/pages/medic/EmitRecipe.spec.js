import React from "react";
import { shallow } from "enzyme";
import EmitRecipe from "./EmitRecipe";

const props = {
  label: "default label"
};
const setup = (anotherProps = {}) => {
  const newProps = {
    ...props,
    ...anotherProps
  };
  const wrapper = shallow(<EmitRecipe {...newProps} />);
  return {
    wrapper,
    instance: wrapper.instance(),
    addItemButton: wrapper.find(".emit-recipe__add-item")
  };
};

describe("<EmitRecipe />", () => {
  it("smoke test", () => {
    const { wrapper } = setup();
    expect(wrapper.exists()).toBe(true);
  });
  describe("when click add item button", () => {
    const { addItemButton, wrapper } = setup({});
    beforeAll(() => {
      addItemButton.simulate("click");
    });
    it("open add item modal", () => {
      const modalAddItem = wrapper.find("AddItemDialog");

      expect(modalAddItem.props().open).toBe(true);
    });
  });
});
