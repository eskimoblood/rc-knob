import React from 'react'
import Example from '../Example'
import colors from '../colors'
import { Arc } from 'rc-knob'

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
    background="${colors.secondary}"
  />
</Knob>
`

export default () => (
    <Example
        title="Arc"
        example={example}
        knob={
            <Arc
                arcWidth={5}
                color={colors.primary}
                background={colors.secondary}
            />
        }
    />
)
