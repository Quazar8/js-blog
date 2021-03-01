import React, { useState, useEffect } from 'react'

const PostSocials = ({ starsBy = {}, 
        dispatchError, dispatchSuccess, username }) => {
    const [star, setStar] = useState('\u2606')

    const changeToFilledStar = () => {
        setStar('\u2605')
    }

    useEffect(() => {
        if (starsBy.hasOwnProperty(username)) {
            changeToFilledStar()
        }
    }, [starsBy])



    const changeToHollowStar = () => {
        setStar('\u2606')
    }

    const changePostStar = () => {
        dispatchError('Not implemented yet')
    }
    
    return (
        <div className = "post-socials-container">
            { Object.keys(starsBy).length }
            <span
                className = "star"
                onMouseEnter = { changeToFilledStar }
                onMouseLeave = { changeToHollowStar }
                onClick = { changePostStar }
            >
                { star }
            </span>
        </div>
    )
}

export default PostSocials