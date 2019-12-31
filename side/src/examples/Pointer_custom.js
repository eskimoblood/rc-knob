import React from 'react'
import Example from '../Example'
import colors from '../colors'
import { Pointer, Arc } from 'rc-knob'

const example = `
const CustomPointer = ({ width, percentage }) => (
    <rect 
      r={width}
      fill={\`hsb(\${360 * percentage}, 50%, 50%)\`} 
    />
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
  >
    <CustomPointer />
  </Pointer>
</Knob>
`
const CustomPointer = ({ width, height, percentage }) => (
    <rect
        width={width}
        height={5 + height * percentage}
        fill={`hsl(${Math.round(360 * percentage)}, 50%, 50%)`}
    />
)
export default () => (
    <Example
        title="Pointer"
        example={example}
        knob={[
            <Arc key="arc" arcWidth={5} color={colors.primary} radius={47.5} />,
            <Pointer width={3} height={40} radius={0} color={colors.primary}>
                <CustomPointer />
            </Pointer>,
        ]}
    />
)
