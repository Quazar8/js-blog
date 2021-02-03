import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { getSinglePostServer, deletePostServer } from '../../api'
import { showError, showSuccess } from '../../store/globalActions'

import PostAuthorButtons from './PostAuthorButtons'
import CommentForm from '../comments/CommentForm'

const PostView = ({ username, dispatch }) => {
    const [post, setPost] = useState({
        title: '',
        content: '',
        thumbnail: '',
        author: {
            username: '',
            profilePic: ''
        }
    })

    const history = useHistory()

    const getPostIdFromUrl = () => {
        const address = window.location.pathname.split('-')
        return address[address.length - 1]
    }

    useEffect(() => {
        const postId = getPostIdFromUrl()
        if (postId) {
            getSinglePostServer(postId).then(resp => {
                if (resp.error) {
                    console.log('Error retrieeving post')
                    return
                }

                setPost(resp.post)
            })
        }
    }, [])

    if (!post) {
        return <h1>No such post exists</h1>
    }

    const deletePost = () => {
        deletePostServer(getPostIdFromUrl()).then(resp => {
            if (resp.error) {
                dispatch(showError(resp.errorMsg))
                return
            }

            dispatch(showSuccess(resp.msg))
            history.push('/')
        })
    }

    const { title, content, thumbnail, author } = post
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
                <h3>
                    Author: 
                    <Link to = {"/profile/" + author.username}>
                        <div className = "author">
                            <span>{ author.username }</span>
                            <img src = { author.profilePic } alt = "author picture" />
                        </div>
                    </Link>
                </h3>
                <p>{ content }</p>
            </article>
            {
                post.author.username === username ?
                <PostAuthorButtons
                    deletePost = { deletePost }
                    postId = { getPostIdFromUrl() }
                />
                : null
            }
            {
                username 
                ? <CommentForm />
                : null
            }
        </section>
    )
}

const mapState = store => ({
    username: store.user.user.username
})

const Post = connect(mapState)(PostView)

export default Post