import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import Main from './Main'
import NavBar from './NavBar'

describe('<Main />', () => {
  it('renders <NavBar', () => {
    const wrapper = shallow(<Main />)
    expect(wrapper.find(NavBar)).to.have.length(1)

  })
})