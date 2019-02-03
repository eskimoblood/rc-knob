import React from 'react'
import Example from '../Example'
import colors from '../colors'
import { Arc, Pointer, Value } from '../lib'

const example = `
<Knob 
  size={100}  
  angleOffset={220} 
  angleRange={280}
  min={0}
  max={100}
>
  <Arc 
    arcWidth={5}
    color="${colors.primary}"
    radius={47.5} 
  />
  <Pointer 
    key="pointer" 
    width={5}
    radius={40}
    type="circle"
    color={colors.secondary}
  />
  <Value 
    marginBottom={40} 
    className="value" 
  />
</Knob>

.value {
  font-family: 'Work Sans', sans-serif;
  fill: #fc5a96;
  font-size: 30px;
}
`

export default () => (
    <Example
        title="Arc && Pointer && Value"
        example={example}
        knob={[
            <Arc key="arc" arcWidth={5} color={colors.primary} radius={47.5} />,
            <Pointer
                key="pointer"
                width={5}
                radius={40}
                type="circle"
                color={colors.secondary}
            />,
            <Value marginBottom={40} className="value2" key="value" />,
        ]}
    />
)
