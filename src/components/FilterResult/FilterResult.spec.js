import React from 'react';
import { shallow } from 'enzyme';
import FilterResult from './FilterResult';

describe('FilterResult', () => {
  it('should match snapshot', () => {
    let component = shallow(<FilterResult selections={{}} filteredTanks={[]} />);
    expect(component).toMatchSnapshot();
  });
});
