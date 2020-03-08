import React from 'react';
import { shallow } from 'enzyme';
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
jest.mock('tank-data-api/tank-data-api', () => (
  {
    fetchData: jest.fn(() => {}),
  }
));
import App from './App.jsx';
import TestApi from 'tank-data-api/tank-data-api';
import ErrorMessage from './components/ErrorMessage';
import Spinner from './components/Spinner';

describe('App', () => {
  it('should match snapshot', () => {
    TestApi.fetchData.mockImplementation(cb => cb(null, data));
    let component = shallow(<App />);
    expect(component).toMatchSnapshot();
  });
  it('should show Error message when error', () => {
    TestApi.fetchData.mockImplementation(cb => cb(null));
    let component = shallow(<App />);
    setImmediate(() => {
      component.update();
      expect(component.containsMatchingElement(<ErrorMessage errorMessage="No Data Found. Please refresh" />)).toBeTruthy();
    });
  });
  it('should show Spinner when error', () => {
    TestApi.fetchData.mockImplementation(() => data);
    let component = shallow(<App />);
    setImmediate(() => {
      component.update();
      expect(component.containsMatchingElement(<Spinner />)).toBeTruthy();
    });
  });
  it('should reset the form on reset Button click', () => {
    TestApi.fetchData.mockImplementation(cb => cb(null, data));
    let component = shallow(<App />);
    component.find('Button').prop('resetForm')();
    expect(component.instance().state.displayData).toEqual([]);
    expect(component.instance().state.selections.type).toBeNull();
    expect(component.instance().state.selections.name).toBeNull();
    expect(component.instance().state.selections.country).toBeNull();
    expect(component.instance().state.selections.ammunition).toBeNull();
  });
  it('should call set selections when refreshOptions is called for type dropdown', () => {
    TestApi.fetchData.mockImplementation(cb => cb(null, data));
    let component = shallow(<App />);
    component.find('Dropdown').at(1).prop('changed')('type', { target: { value: 'heavy' } });
    expect(component.instance().state.selections.type).toEqual('heavy');
  });
  it('should reset the selection when clicked on dropdown type', () => {
    TestApi.fetchData.mockImplementation(cb => cb(null, data));
    let component = shallow(<App />);
    expect(component.instance().state.selections.type).toBeNull();
    component.find('Dropdown').at(1).prop('changed')('type', { target: { value: 'heavy' } });
    expect(component.instance().state.selections.type).toEqual('heavy');
    component.find('Dropdown').at(1).prop('changed')('type', { target: { value: 'type' } });
    expect(component.instance().state.selections.type).toBeNull();
  });
});
