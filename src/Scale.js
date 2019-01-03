import React from 'react'

const renderCircle = ({ tickWidth, translateX, translateY, color }) => (
    _,
    i
) => (
    <circle
        r={tickWidth}
        key={i}
        fill={color}
        transform={`translate( ${translateX} ${translateY})`}
    />
)
const renderRect = ({
    tickWidth,
    tickHeight,
    translateX,
    translateY,
    angleOffset,
    stepSize,
    center,
    color,
}) => (_, i) => (
    <rect
        width={tickWidth}
        height={tickHeight}
        key={i}
        fill={color}
        transform={`
        rotate(${angleOffset + stepSize * i} ${center} ${center}) 
        translate( ${translateX} ${translateY})
        `}
    />
)
const renderCustom = ({ fn, ...props }) => (_, i) => fn({ ...props, i })

export const Scale = ({
    angleRange,
    steps,
    type = 'rect',
    radius,
    tickWidth,
    tickHeight,
    angleOffset,
    center,
    color,
    fn,
}) => {
    const stepSize = angleRange / steps
    const length = steps + (angleRange === 360 ? 0 : 1)
    const translateX = center - tickWidth / 2
    const translateY = center - radius

    const renderFn =
        type === 'circle'
            ? renderCircle({ tickWidth, translateX, translateY, color })
            : type === 'rect'
            ? renderRect({
                  tickWidth,
                  tickHeight,
                  translateX,
                  translateY,
                  angleOffset,
                  stepSize,
                  center,
                  color,
              })
            : renderCustom({
                  fn,
                  tickWidth,
                  tickHeight,
                  translateX,
                  translateY,
                  angleOffset,
                  stepSize,
                  center,
                  color,
              })
    return <g>{Array.from({ length }, renderFn)}</g>
}
