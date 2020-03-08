import React from 'react';
import { shallow } from 'enzyme';
import FilterResult from './FilterResult.jsx';

describe('FilterResult', () => {
  it('should match snapshot', () => {
    let tanks = [{
      id: 1,
      type: 'heavy',
      country: 'USA',
      name: 'T29',
      ammunition: ['AP', 'APCR', 'HE'],
      img: 'http://wiki.gcdn.co/images/thumb/9/96/T29_render_1.jpg/800px-T29_render_1.jpg',
    },
    {
      id: 2,
      type: 'heavy',
      country: 'USA',
      name: 'T57 Heavy Tank',
      ammunition: ['AP', 'HEAT', 'HE'],
      img: 'http://wiki.gcdn.co/images/thumb/9/95/T57_Heavy_Tank_render_1.jpg/800px-T57_Heavy_Tank_render_1.jpg',
    }];
    let component = shallow(<FilterResult selections={{ type: 'heavy' }} filteredTanks={tanks} />);
    expect(component).toMatchSnapshot();
  });
});
