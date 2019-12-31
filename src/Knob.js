import React from 'react'
import useUpdate from './useUpdate'
import { Arc } from './Arc'
import { Pointer } from './Pointer'
import { Scale } from './Scale'
import { Value } from './Value'

const stepsToSnapTo = (steps, snap) =>
    steps && snap
        ? Array.from({ length: steps + 1 }, (_, i) => (1 / steps) * i)
        : undefined

const isInternalComponent = ({ type }) =>
    type === Arc || type === Pointer || type === Scale || type === Value

export const Knob = ({
    min,
    max,
    value: initialValue,
    angleOffset = 0,
    angleRange = 360,
    size,
    onChange = () => {},
    children,
    steps,
    snap = false,
    ariaValueText,
    ariaLabelledBy,
    className,
}) => {
    const {
        percentage,
        value,
        onStart,
        svg,
        container,
        onKeyDown,
        onScroll,
    } = useUpdate({
        min,
        max,
        initialValue,
        angleOffset,
        angleRange,
        size,
        steps: stepsToSnapTo(steps, snap),
        onChange,
    })

    return (
        <div
            ref={container}
            tabIndex="0"
            style={{ outline: 'none', width: size, height: size }}
            aria-valuemax={max}
            aria-valuemin={min}
            aria-valuenow={value}
            aria-valuetext={ariaValueText}
            aria-labelledby={ariaLabelledBy}
            onKeyDown={onKeyDown}
            onWheel={onScroll}
            className={className}
        >
            <svg onMouseDown={onStart} width={size} height={size} ref={svg}>
                {React.Children.map(children, child =>
                    isInternalComponent(child)
                        ? React.cloneElement(child, {
                              percentage,
                              size,
                              value,
                              angleOffset,
                              angleRange,
                              radius: size / 2,
                              center: size / 2,
                              steps,
                              ...child.props,
                          })
                        : child
                )}
            </svg>
        </div>
    )
}
