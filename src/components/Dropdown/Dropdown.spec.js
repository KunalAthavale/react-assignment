import React from 'react';
import { shallow } from 'enzyme';
import Dropdown from './Dropdown';

describe('Dropdown', () => {
  it('should match snapshot', () => {
    let component = shallow(<Dropdown
      selections={{}}
      type="country"
      dropdownOptions={[]}
      changed={jest.fn()}
      key="country"
    />);
    expect(component).toMatchSnapshot();
  });
});
