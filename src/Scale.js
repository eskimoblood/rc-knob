import React from 'react'

const renderCircle = ({
    tickWidth,
    translateX,
    translateY,
    color,
    active,
    activeColor,
    activeClassName,
    className,
}) => (_, i) => (
    <circle
        r={tickWidth}
        key={i}
        className={i === active ? activeClassName : className}
        fill={i === active ? activeColor : color}
        stroke="none"
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
    active,
    activeColor,
    activeClassName,
    className,
}) => (_, i) =>
    console.log('i,active', i, active) || (
        <rect
            className={i === active ? activeClassName : className}
            fill={i === active ? activeColor : color}
            stroke="none"
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
    color,
    activeColor = color,
    className,
    activeClassName = className,
    fn,
    percentage,
}) => {
    const stepSize = angleRange / steps
    const length = steps + (angleRange === 360 ? 0 : 1)
    const translateX = center - tickWidth / 2
    const translateY = center - radius

    const active = Math.round((length - 1) * percentage)
    const renderFn =
        type === 'circle'
            ? renderCircle({
                  tickWidth,
                  translateX,
                  translateY,
                  color,
                  active,
                  activeColor,
                  activeClassName,
              })
            : type === 'rect' && !fn
            ? renderRect({
                  tickWidth,
                  tickHeight,
                  translateX,
                  translateY,
                  angleOffset,
                  stepSize,
                  center,
                  color,
                  active,
                  activeColor,
                  activeClassName,
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
                  active,
                  activeColor,
                  activeClassName,
              })
    return <g>{Array.from({ length }, renderFn)}</g>
}
