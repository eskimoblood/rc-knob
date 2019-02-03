import React from 'react'
import Example from '../Example'
import colors from '../colors'
import { Scale, Pointer } from 'rc-knob'

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
  />
  <circle
    r="35"
    cx="50"
    cy="50"
    fill="${colors.primary}"
  />,
  <Pointer 
    width={2} 
    height={35} 
    radius={10}
    type="rect"
    color="${colors.primary}"
  />
</Knob>
`

export default () => (
    <Example
        title="Scale && Pointer && SVG"
        example={example}
        options={{ steps: 10 }}
        knob={[
            <Scale key="scale" tickWidth={2} tickHeight={2} radius={45} />,
            <circle
                key="circle"
                r="35"
                cx="50"
                cy="50"
                fill={colors.primary}
            />,
            <Pointer
                key="pointer"
                width={2}
                height={35}
                radius={10}
                type="rect"
                color={colors.primary}
            />,
        ]}
    />
)
