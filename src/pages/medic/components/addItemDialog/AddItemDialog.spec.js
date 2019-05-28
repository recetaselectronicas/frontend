import React from "react";
import { shallow } from "enzyme";
import AddItemDialog from "./AddItemDialog";
var sinon = require('sinon');

const props = {
};
const setup = (anotherProps = {}) => {
  const newProps = {
    ...props,
    ...anotherProps
  };
  const wrapper = shallow(<AddItemDialog {...newProps} />);
  return {
    wrapper,
    instance: wrapper.instance(),
    itemTexfield: wrapper.find('.add-item__item-texfield'),
    Suggestions: wrapper.find('Suggestions')
  };
};

describe("<AddItemDialog />", () => {
  const sandbox = sinon.createSandbox();
  it("smoke test", () => {
    const { wrapper } = setup();
    expect(wrapper.exists()).toBe(true);
  });
  describe('when write in item button', () => {
    const responseSearchMedicament = {
      result: [
        {
          label: "ibuprofeno"
        }
      ]
    }
    const searchMedicamentSpy = sandbox.stub().resolves(
      responseSearchMedicament
    );
    const { wrapper, itemTexfield } = setup({ searchMedicament: searchMedicamentSpy });
    const inputValue = "random text"
    itemTexfield.simulate('change', { target: { value: inputValue } });
    it('call searchMedicament with this value', () => {
      expect(searchMedicamentSpy.calledWith(inputValue)).toBe(true);
    });

    it('show suggestion',()=>{
      const Suggestions = wrapper.find('Suggestions');
      expect(Suggestions).toHaveLength(1);
    })
    it('populate the prop suggestion with the result of searchMedicament', () => {
      const Suggestions = wrapper.find('Suggestions');
      expect(Suggestions.props().data).toEqual(responseSearchMedicament.result)
    })


  })

});
