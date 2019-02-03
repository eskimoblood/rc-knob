import React from 'react'
import Example from '../Example'
import colors from '../colors'
import { Scale } from 'rc-knob'

const example = `
<Knob 
  size={100}  
  angleOffset={220} 
  angleRange={280}
  steps={40}
  min={0}
  max={40}
>
  <Scale 
    tickWidth={2}
    tickHeight={2}
    radius={45}
    type="circle"
    activeClassName="activeScale"
    className="normalScale"
  />
</Knob>

.activeScale {
    fill: ${colors.primary};
    r: 2px;
    transition: 100ms ease-in-out;
}
.normalScale {
    fill: ${colors.secondary};
    r: 1px;
    transition: 450ms ease-in-out;
}
`

export default () => (
    <Example
        title="Styled Scale"
        example={example}
        knob={
            <Scale
                tickWidth={2}
                tickHeight={2}
                radius={45}
                type="circle"
                activeClassName="activeScale"
                className="normalScale"
            />
        }
        options={{ steps: 40, max: 40 }}
    />
)
