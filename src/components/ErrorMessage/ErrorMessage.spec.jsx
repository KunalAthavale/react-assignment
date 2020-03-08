import React from 'react';
import { shallow } from 'enzyme';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage', () => {
  it('should match snapshot', () => {
    let component = shallow(<ErrorMessage
      errorMessage="No data found"
    />);
    expect(component).toMatchSnapshot();
  });
});
