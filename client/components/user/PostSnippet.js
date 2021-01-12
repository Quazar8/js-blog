import React from 'react'
import { Link } from 'react-router-dom'

import { getUrlTitle } from '../../utils'

const PostSnippet = ({ post }) => {
    return (
        <Link to = { "/post/" + getUrlTitle(post.title, post.postId) }>
            <div className = "post-snippet">
                <div className = "image-container">
                    <img src = { post.thumbnail } alt = "post thumbnail" />
                </div>
                <h3>{ post.title }</h3>
            </div>
        </Link>
    )
}

export default PostSnippet
