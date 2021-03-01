import React, { useState, useEffect } from 'react'

const PostSocials = ({ starsBy = {}, 
        dispatchError, dispatchSuccess, username }) => {
    const [star, setStar] = useState('\u2606')

    const changeToFilledStar = () => {
        setStar('\u2605')
    }

    useEffect(() => {
        console.log('username', username)
        if (starsBy.hasOwnProperty(username)) {
            console.log('checked')
            changeToFilledStar()
        }
    }, [starsBy, username])



    const changeToHollowStar = () => {
        if (starsBy.hasOwnProperty(username)) {
            return
        }

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