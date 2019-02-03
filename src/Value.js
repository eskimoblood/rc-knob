import React from 'react'

export const Value = ({
    value,
    size,
    decimalPlace = 0,
    className,
    marginBottom = 0,
}) =>
    value == null ? null : (
        <text
            style={{ userSelect: 'none' }}
            x="50%"
            textAnchor="middle"
            className={className}
            y={size - marginBottom}
        >
            {value.toFixed(decimalPlace)}
        </text>
    )
