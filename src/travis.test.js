import React from 'react';
import App from './App';
import { shallow, mount, render} from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

Enzyme.configure({ adapter: new Adapter() })
it('should render without throwing an error', () => {
    expect(shallow(<App />).find('classes.cart').exists()).toBe(true)
  })