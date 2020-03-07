import React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';

describe('Button', () => {
  it('should match snapshot', () => {
    let component = shallow(<Button resetForm={jest.fn()} />);
    expect(component).toMatchSnapshot();
  });
});
