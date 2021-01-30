import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { getUrlTitle } from '../../utils'

const PostRow = ({ post, index, postsLength }) => {
    const { title = "", content = "", 
            authorId = "", postId = "",
            thumbnail = "" } = post
    
    let titlePreview = title
    if (title.length > 34) {
        titlePreview = title.substring(0, 34) + '...'
    }
    const contentPreviewShort = content.substring(0, 167) + '...'
    const contentPreviewLong = content.substring(0, 330) + '...'

    const [postInfo, setPostInfo] = useState({
        titlePreview,
        contentPreview: contentPreviewShort
    })

    const urlTitle = getUrlTitle(title, postId)
    const linkQuery =  {
        pathname: '/post/' + urlTitle,
    }

    const animationDuration = 0.6 //s
    const animationDelay = index * 0.4 //s

    let animationStyle = {
        animationDelay: `${animationDelay}s`,
        animationDuration: `${animationDuration}s`,
        zIndex: postsLength - index
    }

    let rotatingElStyle = {
        zIndex: postsLength + 1
    }

    const changePostInfo = () => {
        setPostInfo({
            titlePreview: title,
            contentPreview: contentPreviewLong
        })
    }

    const revertPostInfo = () => {
        setPostInfo({
            titlePreview,
            contentPreview: contentPreviewShort
        })
    }

    const animationHasEnded = (e) => {
        e.target.style.opacity = 1
    }

    return (
        <article className = "post-row-container">
            <article
                className = "post-row" style = { animationStyle }
                onAnimationEnd = { animationHasEnded }
                onMouseEnter = { changePostInfo }
                onMouseLeave = { revertPostInfo }
            >
                <Link to = { linkQuery }>
                    <div className = "thumbnail-container">
                        <img src = { thumbnail } alt = "post's thumbnail" />
                    </div>
                    <div className = "post-info">
                        <h2>{ postInfo.titlePreview }</h2>
                        <h3>by { authorId }</h3>
                        <p>{ postInfo.contentPreview }</p>
                    </div>
                    <div className = "rotating-element first" style = { rotatingElStyle }></div>,
                    <div className = "rotating-element second" style = { rotatingElStyle }></div>
                </Link>
            </article>
            <div className = "left-element"></div>
            <div className = "right-element"></div>
        </article>
    )
}

export default PostRow