import React from 'react'
import { shallow } from 'enzyme'
import { Value } from '../src/Value'

describe('Value', () => {
    it('renders correct with a given value', () => {
        const component = shallow(
            <Value size={50} value={10.1212} className="someClassName" />
        )
        expect(component).toMatchSnapshot()
    })
    it('renders nothing correct without a given value', () => {
        const component = shallow(<Value size={50} className="someClassName" />)
        expect(component.html()).toBe(null)
    })
})
