import React from 'react'
import { connect } from 'react-redux'

const PostView = ({ post }) => {
    const {title, authorId, content} = {}
    return (
        <article className = "post-view">
            <h2>{ title }</h2>
            <h3>by { authorId }</h3>
            <p>{ content }</p>
        </article>
    )
}

const mapState = store => {
    return {
        post: store.posts.singlePost
    }
}

const Post = connect(mapState)(PostView)

export default Post