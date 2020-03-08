import React from 'react';
import { shallow } from 'enzyme';
import Spinner from './Spinner';

describe('Spinner', () => {
  it('should match snapshot', () => {
    let component = shallow(<Spinner />);
    expect(component).toMatchSnapshot();
  });
});
