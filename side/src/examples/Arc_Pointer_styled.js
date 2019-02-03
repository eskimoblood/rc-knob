import React from 'react'
import Example from '../Example'
import colors from '../colors'
import { Arc, Pointer } from 'rc-knob'

const example = `
<Knob 
  size={100}  
  angleOffset={220} 
  angleRange={280}
  min={0}
  max={100}
>
  <Arc 
    arcWidth={1.5}
  />
  <circle r="40" cx="50" cy="50" />
  <Pointer 
    width={2}
    height={35}
    radius={10}
    type="rect"
    color="#fff"
  />
</Knob>

.styledKnob circle,
.styledKnob path {
    fill: #fc5a96;
    opacity: 0.4;
    transition: 
      opacity 100ms, 
      color 100ms 
      ease-in-out;
}

.styledKnob:hover circle,
.styledKnob:hover path,
.styledKnob:focus circle,
.styledKnob:focus path, {
    fill: #180094;
    opacity: 1;
    transition: 
      opacity 450ms, 
      color 450ms 
      ease-in-out;
}
`

export default () => (
    <Example
        title="Styled Arc && Pointer"
        example={example}
        knob={[
            <Arc key="arc" arcWidth={1.5} className="arc" />,
            <circle r="40" cx="50" cy="50" key="cirle" />,
            <Pointer
                key="pointer"
                width={2}
                height={35}
                radius={10}
                type="rect"
                color="#fff"
            />,
        ]}
        options={{ className: 'styledKnob' }}
    />
)
