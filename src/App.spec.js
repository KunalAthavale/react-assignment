import React from 'react';
import { shallow } from 'enzyme';
jest.mock('../api/index.js', () => (
  {
    fetchData: jest.fn(() => {
      const data = [
        {
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
        },
        {
          id: 3,
          type: 'medium',
          country: 'USA',
          name: 'M48A5 Patton',
          ammunition: ['APCR', 'HEAT', 'HE'],
          img: 'http://wiki.gcdn.co/images/a/a7/AnnoA120_M48A5.png',
        },
      ];
      return data;
    }),
  }
));

import App from './App';

describe('App', () => {
  it('should match snapshot', () => {
    let component = shallow(<App />);
    expect(component).toMatchSnapshot();
  });
});
