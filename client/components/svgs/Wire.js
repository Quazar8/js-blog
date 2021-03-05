import React from 'react'

const Wire = () => {
    return (
        <svg viewBox = "0 0 100 100" className = "wire">
            <defs>
                <linearGradient id = "grad"
                x1 = "0%" y1 = "0%"
                x2 = "100%" y2 = "0%">
                    <stop className = "color1">
                        <animate 
                            attributeName = "offset"
                            from = "-10%"
                            to = "140%"
                            dur = "2s"
                            repeatCount = "indefinite"
                        />
                    </stop>
                    <stop className = "color2">
                        <animate 
                            attributeName = "offset"
                            from = "0%"
                            to = "150%"
                            dur = "2s"
                            repeatCount = "indefinite"
                        />
                    </stop>
                    <stop className = "color3">
                        <animate 
                            attributeName = "offset"
                            from = "10%"
                            to = "160%"
                            dur = "2s"
                            repeatCount = "indefinite"
                        />
                    </stop>
                </linearGradient>
            </defs>
            <path
                d = "M130 50 L55 50 L40 30"
                stroke = "url(#grad)"
            />
            <circle 
                cx = "37"
                cy = "25"
                r = "7"
            />
        </svg>
    )
}

export default Wire