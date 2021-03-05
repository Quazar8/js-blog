import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { getUrlTitle } from '../../utils'

import Wire from '../svgs/Wire'

const PostRow = ({ post, index }) => {
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

    return (
        <article className = "post-row-container">
            <article
                className = "post-row" 
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
                    <div className = "rotating-element first"></div>,
                    <div className = "rotating-element second"></div>
                </Link>
            </article>
            <Wire index = { index }/>
        </article>
    )
}

export default PostRow