import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { retrievePostAction } from '../../store/postsActions'

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

    const { title, authorId, content, thumbnail } = post
    return (
        <section className = "post-container">
            <article className = "post-view">
                <div className = "thumbnail-container">
                    <img src = { thumbnail } alt = "thumbnail picture" />
                    <div className = "shader-left"></div>
                    <div className = "shader-bottom"></div>
                    <div className = "shader-right"></div>
                </div>
                <h2>{ title }</h2>
                <h3>Author: { authorId }</h3>
                <p>{ content }</p>
            </article>
        </section>
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