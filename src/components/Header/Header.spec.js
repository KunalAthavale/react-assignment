import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

describe('Header', () => {
  it('should match snapshot', () => {
    let component = shallow(<Header />);
    expect(component).toMatchSnapshot();
  });
});
