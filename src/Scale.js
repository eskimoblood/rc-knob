import React from 'react'

const renderCircle = ({ tickWidth, translateX, translateY }) => (_, i) => (
    <circle
        r={tickWidth}
        key={i}
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
}) => (_, i) => (
    <rect
        width={tickWidth}
        height={tickHeight}
        key={i}
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
    fn,
}) => {
    const stepSize = angleRange / steps
    const length = steps + (angleRange === 360 ? 0 : 1)
    const translateX = center - tickWidth
    const translateY = center - radius

    const renderFn =
        type === 'circle'
            ? renderCircle({ tickWidth, translateX, translateY })
            : type === 'rect'
            ? renderRect({
                  tickWidth,
                  tickHeight,
                  translateX,
                  translateY,
                  angleOffset,
                  stepSize,
                  center,
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
              })
    return <g>{Array.from({ length }, renderFn)}</g>
}
