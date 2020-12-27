import React from 'react'
const Arrow = () => {
    return (
        <svg className = "arrow" viewBox = "0 0 100 50">
            <line x1 = "0" y1 = "25" x2 = "100" y2 = "25" />
            <line x1 = "70" y1 = "0" x2 = "100" y2 = "25" /> 
            <line x1 = "70" y1 = "50" x2 = "100" y2 = "25" /> 
        </svg>
    )
}

export default Arrow
