import React, { useState, useEffect } from 'react'
import { changePostStarServer, getPostStarsServer } from '../../api'

const PostSocials = ({ postId, dispatchError, dispatchSuccess,
        username }) => {
    const [star, setStar] = useState(false)
    const [starsBy, setStarsBy] = useState({})

    const changeToFilledStar = () => {
        setStar(true)
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

        setStar(false)
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

        changePostStarServer(postId, { up }).then(resp => {
            if (resp.error) {
                dispatchError(resp.errorMsg)
                return
            }

            if (up) {
                dispatchSuccess('You gave this post a star')
            } else {
                dispatchSuccess('You took away a star')
            }
            retrieveStars()
        })
    }
    
    return (
        <div className = "post-socials-container">
            { Object.keys(starsBy).length }
            <span
                className = { star ? "star star-colored" : "star"}
                onMouseEnter = { changeToFilledStar }
                onMouseLeave = { changeToHollowStar }
                onClick = { changePostStar }
            >
                {
                    star 
                    ? '\u2605'
                    : '\u2606'
                }
            </span>
        </div>
    )
}

export default PostSocials