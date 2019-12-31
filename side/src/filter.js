import React from 'react'

export default () => (
    <svg>
        <filter id="inner-shadow">
            <feOffset dx="0" dy="5" />
            <feGaussianBlur stdDeviation="5" result="offset-blur" />
            <feComposite
                operator="out"
                in="SourceGraphic"
                in2="offset-blur"
                result="inverse"
            />
        </filter>
    </svg>
)
