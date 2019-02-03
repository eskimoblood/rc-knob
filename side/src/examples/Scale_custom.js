import React from 'react'
import Example from '../Example'
import { Scale } from 'rc-knob'

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
    steps={20}
    tickWidth={1}
    tickHeight={5}
    radius={45}
    fn={CustomScaleTick}
    />
</Knob>
`

const customScaleTick = ({
    tickWidth,
    tickHeight,
    translateX,
    translateY,
    angleOffset,
    stepSize,
    center,
    active,
    i,
}) => (
    <rect
        fill={`hsl(${(240 + (40 - i) * 4) % 360},100%, 60%)`}
        stroke="none"
        width={tickWidth}
        height={i === active ? 9 : tickHeight}
        key={i}
        transform={`
        rotate(${angleOffset + stepSize * i} ${center} ${center}) 
        translate( ${translateX} ${translateY})
        `}
    />
)

export default () => (
    <Example
        title="Custom Scale"
        example={example}
        knob={[
            <Scale
                steps={40}
                tickWidth={1}
                tickHeight={5}
                radius={45}
                fn={customScaleTick}
            />,
        ]}
    />
)
