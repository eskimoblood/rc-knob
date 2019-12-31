import React from 'react'
import Example from '../Example'
import colors from '../colors'
import { Pointer } from 'rc-knob'

const example = `
<Knob 
  size={100}  
  angleOffset={220} 
  angleRange={280}
  min={0}
  max={100}
  onChange={value => console.log(value)}
>
  <Pointer 
    width={3} 
    radius={40}
    type="circle"
    color="${colors.primary}"
  />
</Knob>
`

export default () => (
    <Example
        title="Pointer"
        example={example}
        knob={
            <Pointer
                width={3}
                radius={40}
                type="circle"
                color={colors.primary}
            />
        }
    />
)
