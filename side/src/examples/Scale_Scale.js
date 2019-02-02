import React from 'react'
import Example from '../Example'
import colors from '../colors'
import { Scale, Pointer } from '../lib'

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
    key="scale"
    steps={10}
    tickWidth={1}
    tickHeight={5}
    radius={45}
    color="${colors.primary}"
  />
  <Scale 
    key="scale" 
    tickWidth={1}
    tickHeight={2}
    radius={45} 
    color="${colors.primary}"
  />
  <Pointer
    width={1}
    height={5}
    radius={40}
    type="rect"
    color="${colors.secondary}"
  />
</Knob>
`

export default () => (
    <Example
        title="Scale && Pointer && SVG"
        example={example}
        options={{ steps: 50 }}
        knob={[
            <Scale
                key="scale"
                steps={10}
                tickWidth={1}
                tickHeight={5}
                radius={45}
                color={colors.primary}
            />,
            <Scale
                key="scale"
                tickWidth={1}
                tickHeight={2}
                radius={45}
                color={colors.primary}
            />,
            <Pointer
                width={1}
                height={5}
                radius={40}
                type="rect"
                color={colors.secondary}
            />,
        ]}
    />
)
