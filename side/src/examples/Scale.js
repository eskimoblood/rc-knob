import React from 'react'
import Example from '../Example'
import colors from '../colors'
import { Scale } from '../lib'

const example = `
<Knob 
  size={100}  
  angleOffset={220} 
  angleRange={280}
  steps={10}
  min={0}
  max={100}
>
  <Scale 
    tickWidth={2} 
    tickHeight={2} 
    radius={45}
    color="${colors.secondary}"
    activeColor="${colors.primary}"
  />
</Knob>
`

export default () => (
    <Example
        title="Scale"
        example={example}
        knob={
            <Scale
                tickWidth={2}
                tickHeight={2}
                radius={45}
                color={colors.secondary}
                activeColor={colors.primary}
            />
        }
        options={{ steps: 10 }}
    />
)
