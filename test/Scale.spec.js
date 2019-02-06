import React from 'react'
import { shallow } from 'enzyme'
import { Scale } from '../src/Scale'

describe('Scale', () => {
    it('renders correct no type is set', () => {
        const component = shallow(
            <Scale
                angleRange={200}
                steps={5}
                radius={40}
                tickWidth={2}
                tickHeight={10}
                angleOffset={90}
                center={20}
                percentage={50}
                color="lime"
                activeColor="red"
                className="someClassName"
                activeClassName="someActiveClassName"
            />
        )
        expect(component).toMatchSnapshot()
    })
    it('renders correct no type is set to rect', () => {
        const component = shallow(
            <Scale
                type="rect"
                angleRange={200}
                steps={5}
                radius={40}
                tickWidth={2}
                tickHeight={10}
                angleOffset={90}
                center={20}
                percentage={50}
                color="lime"
                activeColor="red"
                className="someClassName"
                activeClassName="someActiveClassName"
            />
        )
        expect(component).toMatchSnapshot()
    })
    it('renders correct no type is set to circle', () => {
        const component = shallow(
            <Scale
                type="circle"
                angleRange={200}
                steps={5}
                radius={40}
                tickWidth={2}
                tickHeight={10}
                angleOffset={90}
                center={20}
                percentage={50}
                color="lime"
                activeColor="red"
                className="someClassName"
                activeClassName="someActiveClassName"
            />
        )
        expect(component).toMatchSnapshot()
    })
    it('renders correct with custom render function for ticks', () => {
        const fn = ({ tickWidth, translateX, translateY, i }) => (
            <circle r={tickWidth} x={translateX} y={translateY} key={i} />
        )
        const component = shallow(
            <Scale
                angleRange={200}
                steps={5}
                radius={40}
                tickWidth={2}
                tickHeight={10}
                angleOffset={90}
                center={20}
                percentage={50}
                color="lime"
                activeColor="red"
                className="someClassName"
                activeClassName="someActiveClassName"
                fn={fn}
            />
        )
        expect(component).toMatchSnapshot()
    })
})
