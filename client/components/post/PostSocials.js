import React, { useState } from 'react'

const PostSocials = ({ starsBy = {} }) => {
    const [star, setStar] = useState('\u2606')

    const changeToFilledStar = () => {
        setStar('\u2605')
    }

    const changeToHollowStar = () => {
        setStar('\u2606')
    }
    
    return (
        <div className = "post-socials-container">
            { Object.keys(starsBy).length }
            <span
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