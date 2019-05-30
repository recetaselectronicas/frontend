import React from "react";
import { shallow } from "enzyme";
import Component from "./EmitRecipe";

const props = {
};
const setup = (anotherProps = {}) => {
    const newProps = {
        ...props,
        ...anotherProps
    };
    const wrapper = shallow(<Component {...newProps} />);
    return {
        wrapper,
        instance: wrapper.instance(),
    };
};

describe("<EmitRecipe />", () => {
    it("smoke test", () => {
        const { wrapper } = setup();
        expect(wrapper.exists()).toBe(true);
    });

});
