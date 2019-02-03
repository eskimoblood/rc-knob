import React from 'react'

const pointOnCircle = (center, radius, angle) => ({
    x: center + radius * Math.cos(angle),
    y: center + radius * Math.sin(angle),
})
const degTorad = deg => (Math.PI * deg) / 180

const calcPath = ({
    percentage,
    angleOffset,
    angleRange,
    arcWidth,
    radius: outerRadius,
    center,
}) => {
    const angle = angleRange * percentage
    const startAngle = angleOffset - 90
    const innerRadius = outerRadius - arcWidth
    const startAngleDegree = degTorad(startAngle)
    const endAngleDegree = degTorad(startAngle + angle)
    const largeArcFlag = angle < 180 ? 0 : 1

    const p1 = pointOnCircle(center, outerRadius, endAngleDegree)
    const p2 = pointOnCircle(center, outerRadius, startAngleDegree)
    const p3 = pointOnCircle(center, innerRadius, startAngleDegree)
    const p4 = pointOnCircle(center, innerRadius, endAngleDegree)

    return `M${p1.x},${
        p1.y
    } A${outerRadius},${outerRadius} 0 ${largeArcFlag} 0 ${p2.x},${p2.y}L${
        p3.x
    },${p3.y} A${innerRadius},${innerRadius} 0 ${largeArcFlag} 1 ${p4.x},${
        p4.y
    } L${p1.x},${p1.y}`
}

export const Arc = ({ color, background, ...props }) => (
    <g>
        {background && (
            <path
                d={calcPath({ ...props, percentage: 1 })}
                style={{ fill: background }}
            />
        )}
        <path d={calcPath(props)} style={{ fill: color }} />
    </g>
)
