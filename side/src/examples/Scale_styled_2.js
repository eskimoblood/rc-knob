import React from 'react'
import Example from '../Example'
import colors from '../colors'
import { Scale, Pointer } from '../lib'

const example = `
<Knob 
  size={100}  
  angleOffset={220} 
  angleRange={280}
  steps={20}
  min={0}
  max={20}
  className="withFilter"
  onChange={value => console.log(value)}
>
  <Scale
  tickWidth={5}
  tickHeight={15}
  radius={45}
  type="circle"
  activeClassName="activeScale"
  className="normalScale"
  />
  <filter id="filter">
    <feGaussianBlur
        in="SourceGraphic"
        stdDeviation="5"
        result="blur"
    />
    <feColorMatrix
        in="blur"
        mode="matrix"
        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 26 -7"
        result="goo"
    />
    <feComposite
        in="SourceGraphic"
        in2="goo"
        operator="arithmetic"
        k1="0.1"
        k2="1"
        k3="0.9"
        k4="-0.4"
    />
  </filter>
</Knob>

.withFilter {
  filter: url('#filter');
}

.activeScale {
  fill: #180094;
  r: 2px;
  transition: 100ms ease-in-out;
}
.normalScale {
  fill: #fc5a96;
  r: 4px;
  transition: 450ms ease-in-out;
}
.pointer {
  fill: rgba(255, 235, 59, 0.8);
  r: 8px;
  transition: 100ms ease-in-out;
}
`

export default () => (
    <Example
        title="Styled Scale with SVG filter"
        example={example}
        knob={[
            <Scale
                tickWidth={5}
                tickHeight={15}
                radius={45}
                type="circle"
                className="normalScale2"
                activeClassName="activeScale"
            />,
            <Pointer
                width={5}
                height={15}
                radius={25}
                type="circle"
                className="pointer"
            />,
            <filter id="filter2">
                <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="5"
                    result="blur"
                />
                <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 26 -7"
                    result="goo"
                />
                <feComposite
                    in="SourceGraphic"
                    in2="goo"
                    operator="arithmetic"
                    k1="0.1"
                    k2="1"
                    k3="0.9"
                    k4="-0.4"
                />
            </filter>,
        ]}
        options={{ steps: 20, max: 20, className: 'filter2' }}
    />
)
