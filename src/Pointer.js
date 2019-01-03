import React from 'react'

export const Pointer = ({
    children,
    width,
    height = width,
    angleOffset,
    angleRange,
    percentage,
    radius,
    center,
    type,
    color,
    className,
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
                    color,
                    className,
                })
            )}
        {type === 'rect' && (
            <rect
                width={width}
                height={height}
                fill={color}
                className={className}
            />
        )}
        {type === 'circle' && (
            <circle r={width} fill={color} className={className} />
        )}
    </g>
)
