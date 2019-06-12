import React from 'react';
import { shallow } from 'enzyme';
import FiltersSection from './FiltersSection';

const props = {};
const setup = (anotherProps = {}) => {
  const newProps = {
    ...props,
    ...anotherProps,
  };
  const wrapper = shallow(<FiltersSection {...newProps} />);
  return {
    wrapper,
    instance: wrapper.instance(),
    statusDropdown: wrapper.find('.status-dropdown'),
  };
};

describe('<FiltersSection />', () => {
  describe('common filters ', () => {
    describe('single filters ', () => {
      describe('when pass status filter', () => {
        const { statusDropdown } = setup({
          filters: {
            status: {
              id: 'status',
              values: [
                {
                  id: 'CONFIRMED',
                  value: 'CONFIRMADA',
                },
              ],
            },
          },
        });
        it('render it', () => {
          expect(statusDropdown).toHaveLength(1);
        });
      });
      describe('when pass status filter', () => {
        const { statusDropdown } = setup({
          filters: {},
        });
        it('dont render it', () => {
          expect(statusDropdown).toHaveLength(0);
        });
      });
    });
  });
});
