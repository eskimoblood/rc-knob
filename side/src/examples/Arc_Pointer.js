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
  onChange={value => console.log(value)}
>
  <Arc 
    arcWidth={5}
    color="${colors.primary}"
  />
  <Pointer 
    width={5}
    height={40}
    radius={10}
    type="rect"
    color="${colors.primary}"
  />
</Knob>
`

export default () => (
    <Example
        title="Arc && Pointer"
        example={example}
        knob={[
            <Arc key="arc" arcWidth={5} color={colors.primary} />,
            <Pointer
                key="pointer"
                width={5}
                height={40}
                radius={10}
                type="rect"
                color={colors.primary}
            />,
        ]}
    />
)
