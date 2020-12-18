import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { retrievePostAction } from '../store/postsActions'

const PostView = ({ post, tryGetPost }) => {
    useEffect(() => {
        const address = window.location.pathname.split('-')
        const postId = address[address.length - 1]
        if(postId) {
            tryGetPost(postId)
        }
    }, [])

    if (!post.title) {
        return <h1>No such post exists</h1>
    }

    const { title, authorId, content } = post
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

const mapDisptach = dispatch => {
    return {
        tryGetPost: postId => {
            dispatch(retrievePostAction(postId))
        }
    }
}

const Post = connect(mapState, mapDisptach)(PostView)

export default Post