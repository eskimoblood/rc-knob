import React from 'react'

export const Pointer = ({
    children,
    size,
    width,
    height = width,
    angleOffset,
    angleRange,
    percentage,
    radius,
    center,
    style,
    type,
    fill,
}) => (
    <g
        transform={`
        rotate(${angleOffset + angleRange * percentage} ${center} ${center})
        translate( ${center - width / 2} ${center - radius - height})
        `}
    >
        {children &&
            React.Children.map(children, child =>
                React.cloneElement(child, {
                    width,
                    height,
                    percentage,
                    fill,
                })
            )}
        {type === 'rect' && <rect width={width} height={height} fill={fill} />}
        {type === 'circle' && <circle r={width} fill={fill} />}
    </g>
)
