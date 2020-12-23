import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const PostRow = ({ post, index, postsLength }) => {
    const { title, content, 
            authorId, postId,
            thumbnail } = post

    const [postInfo, setPostInfo] = useState({
        titlePreview: '',
        contentPreview: ''
    })

    useEffect(() => {
        let titlePreview = title
        if (title.length > 34) {
            titlePreview = title.substring(0, 34) + '...'
        }

        const contentPreview = content.substring(0, 168) + '...'
        setPostInfo({ titlePreview, contentPreview })
    }, [])

    const getUrlTitle = () => {
        const urlTitle = title.replace(' ', '-')
        if (urlTitle[urlTitle.length - 1] == '-') {
            return urlTitle + postId
        }

        return urlTitle + '-' + postId
    }
    
    const urlTitle = getUrlTitle()
    const linkQuery =  {
        pathname: '/post/' + urlTitle,
    }

    const animationDuration = 0.6 //s
    const animationDelay = index * 0.4 //s

    const animationStyle = {
        animationDelay: `${animationDelay}s`,
        animationDuration: `${animationDuration}s`,
        zIndex: postsLength - index
    }

    const changePostInfo = () => {

    }

    return (
        <article onMouseEnter = { changePostInfo } className = "post-row" style = { animationStyle }>
            <Link to = { linkQuery }>
                    <div className = "thumbnail-container">
                        <img src = { thumbnail } alt = "post's thumbnail" />
                    </div>
                    <div className = "post-info">
                        <h2>{ postInfo.titlePreview }</h2>
                        <h3>by { authorId }</h3>
                        <p>{ postInfo.contentPreview }</p>
                    </div>
            </Link>
        </article>
    )
}

export default PostRow