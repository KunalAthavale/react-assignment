import React from 'react';
import { shallow } from 'enzyme';
import Dropdown from './Dropdown.jsx';

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
  it('should call function when event is change', () => {
    let changedTriggered = false;
    let mockOnChange = jest.fn(() => {
      changedTriggered = true;
    });
    let component = shallow(<Dropdown
      selections={{}}
      type="country"
      dropdownOptions={[]}
      changed={mockOnChange}
      key="country"
    />);
    component.find('select').simulate('change');
    expect(changedTriggered).toBe(true);
  });
  it('should render number of options as passed', () => {
    let component = shallow(<Dropdown
      selections={{}}
      type="country"
      dropdownOptions={['option1', 'option2']}
      changed={jest.fn()}
      key="country"
    />);
    let optionCount = component.find('option').length;
    expect(optionCount).toBe(3);
  });
});
