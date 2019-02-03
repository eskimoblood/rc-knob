import React from 'react'
import { shallow } from 'enzyme'
import { Arc } from '../src/Arc'

describe('Arc', () => {
    it('renders correct with background color is given', () => {
        const component = shallow(
            <Arc
                percentage={50}
                angleOffset={0}
                angleRange={180}
                arcWidth={5}
                center={0}
                radius={50}
                color="lime"
                background="red"
            />
        )
        expect(component).toMatchSnapshot()
    })
    it('renders correct without background color is given', () => {
        const component = shallow(
            <Arc
                percentage={50}
                angleOffset={0}
                angleRange={180}
                arcWidth={5}
                center={0}
                radius={50}
                color="lime"
                background="red"
            />
        )
        expect(component).toMatchSnapshot()
    })
})
