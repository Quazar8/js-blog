import React, { useState, useEffect } from 'react'
import { changePostStarServer } from '../../api'

const PostSocials = ({ starsBy = {}, postId,
        dispatchError, dispatchSuccess, username }) => {
    const [star, setStar] = useState('\u2606')

    const changeToFilledStar = () => {
        setStar('\u2605')
    }

    useEffect(() => {
        if (starsBy.hasOwnProperty(username)) {
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
        if (!username) {
            dispatchError('You need to be logged in to do that')
            return
        }
        
        let up = true

        if (starsBy.hasOwnProperty(username)) {
            up = false
        }

    //     changePostStarServer(postId, { up }).then(resp => {
    //         console.log(resp)
    //     })
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