import React, { useState } from 'react'

const PostSocials = () => {
    const [star, setStar] = useState('\u2606')

    const changeToFilledStar = () => {
        setStar('\u2605')
    }

    const changeToHollowStar = () => {
        setStar('\u2606')
    }
    
    return (
        <div className = "post-socials-container">
            0 <span
                className = "star"
                onMouseEnter = { changeToFilledStar }
                onMouseLeave = { changeToHollowStar }
            >
                { star }
            </span>
        </div>
    )
}

export default PostSocials