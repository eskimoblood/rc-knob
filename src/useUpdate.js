import { useReducer, useEffect, useRef } from 'react'

const caclulatePercentage = ({
    startX,
    startY,
    pageX,
    pageY,
    angleOffset,
    angleRange,
}) => {
    const x = startX - pageX
    const y = startY - pageY
    const degree = (Math.atan2(-y, -x) * 180) / Math.PI + 90 - angleOffset
    const angle = degree < 0 ? degree + 360 : degree % 360

    if (angle <= angleRange) {
        return Math.max(Math.min(1, angle / angleRange), 0)
    } else {
        return +(angle - angleRange < (360 - angleRange) / 2)
    }
}

const getValueFromPercentage = ({ min, max, percentage }) =>
    min + (max - min) * percentage

const getPercentageFromValue = ({ min, max, value }) =>
    (value - min) / (max - min)

const clamp = (min, max, value) => Math.max(min, Math.min(max, value))

const getStartXY = ({ container, size }) => ({
    startX: Math.floor(container.current.offsetLeft) + size / 2,
    startY: Math.floor(container.current.offsetTop) + size / 2,
})

const findClosest = (values, value) => {
    var result, lastDelta

    values.some(item => {
        const delta = Math.abs(value - item)
        if (delta >= lastDelta) {
            return true
        }
        result = item
        lastDelta = delta
    })
    return result
}

const reducer = onChange => (state, action) => {
    switch (action.type) {
        case 'START':
            return {
                ...state,
                isActive: true,
                ...getStartXY(state),
            }
        case 'MOVE':
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
        case 'INCREASE':
            value = clamp(
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
        default:
            return { ...state, isActive: false, value: state.value }
    }
}

const eventHandling = ({ dispatch, isActive }) => () => {
    const onMove = ({ pageX, pageY }) =>
        dispatch({ pageX, pageY, type: 'MOVE' })
    const onStop = () => dispatch({ type: 'STOP' })
    if (isActive) {
        document.body.addEventListener('mousemove', onMove)
        document.body.addEventListener('mouseup', onStop)
        return () => {
            document.body.removeEventListener('mousemove', onMove)
            document.body.removeEventListener('mouseup', onStop)
        }
    }
}

const DIRECTIONS = {
    37: -1,
    38: 1,
    39: 1,
    40: -1,
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
            percentage: initialValue ? (max - min) / initialValue : 0,
            value: initialValue || 0,
            svg,
            container,
            size,
        }
    )

    useEffect(eventHandling({ dispatch, isActive }), [isActive])
    return {
        svg,
        container,
        percentage: steps ? findClosest(steps, percentage) : percentage,
        value,
        angle,
        onStart: e => dispatch({ ...e, type: 'START' }),
        onKeyDown: e => {
            const direction = DIRECTIONS[e.keyCode]
            if (!direction) {
                return
            }
            e.preventDefault()
            dispatch({
                type: 'INCREASE',
                direction,
            })
        },
    }
}
