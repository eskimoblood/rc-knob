import { useReducer, useEffect, useRef } from 'react'
import {
    caclulatePercentage,
    findClosest,
    getStartXY,
    getValueFromPercentage,
    clamp,
    getPercentageFromValue,
} from './utils'
import {
    onMouseMoveStart,
    onKeyDown,
    handleEventListener,
    onScroll,
} from './eventHandling'

const onStart = state => ({
    ...state,
    isActive: true,
    ...getStartXY(state),
})

const onMove = ({ state, action, onChange }) => {
    const percentage = caclulatePercentage({
        ...state,
        ...action,
    })
    let value = getValueFromPercentage({ ...state, percentage })

    onChange(value)
    return {
        ...state,
        percentage,
        value,
    }
}

const onChangeByStep = ({ state, action, onChange }) => {
    const value = clamp(
        state.min,
        state.max,
        state.value + 1 * action.direction
    )
    onChange(value)
    return {
        ...state,
        value,
        percentage: getPercentageFromValue({ ...state, value }),
    }
}
const reducer = onChange => (state, action) => {
    switch (action.type) {
        case 'START':
            return onStart(state)
        case 'MOVE':
            return onMove({ state, action, onChange })
        case 'STEPS':
            return onChangeByStep({ state, action, onChange })
        default:
            return { ...state, isActive: false, value: state.value }
    }
}

export default ({
    min,
    max,
    initialValue,
    angleOffset = 0,
    angleRange = 360,
    size,
    steps,
    snap,
    onChange,
}) => {
    const svg = useRef()
    const container = useRef()
    const [{ percentage, value, angle, isActive }, dispatch] = useReducer(
        reducer(onChange),
        {
            isActive: false,
            min,
            max,
            angleOffset,
            angleRange,
            percentage: initialValue ? (initialValue - min) / (max - min) : 0,
            value: initialValue || 0,
            svg,
            container,
            size,
        }
    )

    useEffect(handleEventListener({ dispatch, isActive }), [isActive])
    return {
        svg,
        container,
        percentage: steps ? findClosest(steps, percentage) : percentage,
        value,
        angle,
        onStart: onMouseMoveStart(dispatch),
        onKeyDown: onKeyDown(dispatch),
        onScroll: onScroll(dispatch),
    }
}
