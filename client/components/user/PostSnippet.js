import React from 'react'

const PostSnippet = ({ post }) => {
    return (
        <div className = "post-snippet">
            <div className = "image-container">
                <img src = { post.thumbnail } alt = "post thumbnail" />
            </div>
            <h3>{ post.title }</h3>
        </div>
    )
}

export default PostSnippet
