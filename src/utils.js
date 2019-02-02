export const clamp = (min, max, value) => Math.max(min, Math.min(max, value))

export const caclulatePercentage = ({
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
        return clamp(0, 1, angle / angleRange)
    } else {
        return +(angle - angleRange < (360 - angleRange) / 2)
    }
}

export const findClosest = (values, value) => {
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

export const getValueFromPercentage = ({ min, max, percentage }) =>
    min + (max - min) * percentage

export const getPercentageFromValue = ({ min, max, value }) =>
    (value - min) / (max - min)

export const getStartXY = ({ container, size }) => ({
    startX: Math.floor(container.current.offsetLeft) + size / 2,
    startY: Math.floor(container.current.offsetTop) + size / 2,
})
