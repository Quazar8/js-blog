import React, { useState, useEffect } from 'react'
import { changePostStarServer, getPostStarsServer } from '../../api'

const PostSocials = ({ postId, dispatchError, dispatchSuccess,
        username }) => {
    const [star, setStar] = useState('\u2606')
    const [starsBy, setStarsBy] = useState({})

    const changeToFilledStar = () => {
        setStar('\u2605')
    }

    const retrieveStars = () => {
        getPostStarsServer(postId).then(resp => {
            if (!resp.error) {
                setStarsBy(resp.starsBy)
            }
        })
    }

    useEffect(() => {
        retrieveStars()
    }, [postId])

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

        // changePostStarServer(postId, { up }).then(resp => {
        //     console.log(resp)
        // })
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