import React, { useState, useEffect } from 'react'

const Wire = ({ index }) => {
    const [wireClass, setWireClass] = useState('wire wire-left')

    useEffect(() => {
        if (index % 2 !== 0) {
            setWireClass('wire wire-right')
        }
    }, [index])

    return (
        <svg viewBox = "0 0 100 100" className = { wireClass }>
            <defs>
                <linearGradient id = "grad"
                x1 = "0%" y1 = "0%"
                x2 = "100%" y2 = "0%">
                    <stop className = "color1">
                        <animate
                            id = "w-c1"
                            attributeName = "offset"
                            from = "-10%"
                            to = "140%"
                            dur = "2s"
                            begin = "1s;c1.end"
                        />
                    </stop>
                    <stop className = "color2">
                        <animate 
                            id = "w-c2"
                            attributeName = "offset"
                            from = "0%"
                            to = "150%"
                            dur = "2s"
                            begin = "1s;c2.end"
                        />
                    </stop>
                    <stop className = "color3">
                        <animate 
                            id = "w-c3"
                            attributeName = "offset"
                            from = "10%"
                            to = "160%"
                            dur = "2s"
                            begin = "1s;c3.end"
                        />
                    </stop>
                </linearGradient>

                <linearGradient id = "grad-circle"
                x1 = "0%" y1 = "10%"
                x2 = "100%" y2 = "100%">
                    <stop className = "color1">
                        <animate 
                            id = "c1"
                            attributeName = "offset"
                            from = "-10%"
                            to = "80%"
                            dur = "1s"
                            begin = "0s; w\-c1.end"
                        />
                    </stop>
                    <stop className = "color2">
                        <animate 
                            id = "c2"
                            attributeName = "offset"
                            from = "0%"
                            to = "90%"
                            dur = "1s"
                            begin = "0s;w\-c2.end"
                        />
                    </stop>
                    <stop className = "color3">
                        <animate 
                            id = "c3"
                            attributeName = "offset"
                            from = "10%"
                            to = "100%"
                            dur = "1s"
                            begin = "0s;w\-c3.end"
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
                stroke = "url(#grad-circle)"
            />
        </svg>
    )
}

export default Wire