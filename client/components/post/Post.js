import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { getSinglePostServer, deletePostServer } from '../../api'
import { showError, showSuccess } from '../../store/globalActions'

import PostAuthorButtons from './PostAuthorButtons'
import CommentSection from '../comments/CommentSection'
import PostSocials from './PostSocials'

const PostView = ({ user, dispatchError, dispatchSuccess }) => {
    const [post, setPost] = useState({
        title: '',
        content: '',
        thumbnail: '',
        author: {
            username: '',
            profilePic: ''
        },
        comments: []
    })


    const { username } = user
    const history = useHistory()

    const getPostIdFromUrl = () => {
        const address = window.location.pathname.split('-')
        return address[address.length - 1]
    }

    const postId = getPostIdFromUrl()
    useEffect(() => {
        if (postId) {
            getSinglePostServer(postId).then(resp => {
                if (resp.error) {
                    dispatchError(resp.errorMsg)
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
                dispatchError(resp.errorMsg)
                return
            }

            dispatchSuccess(resp.msg)
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
                <PostSocials 
                    dispatchError = { dispatchError }
                    dispatchSuccess = { dispatchSuccess }
                    username = { user.username } 
                    postId = { postId }
                />
                <h2>{ title }</h2>
                <h3>
                    Author: 
                    <Link className = "author-link" to = {"/profile/" + author.username}>
                        <div className = "author">
                            <span>{ author.username }</span>
                            <div className = "image-container">
                                <img src = { author.profilePic } alt = "author picture" />
                            </div>
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
            <CommentSection 
                user = { user } 
                dispatchError = { dispatchError }
                dispatchSuccess = { dispatchSuccess }
                postId = { getPostIdFromUrl() }
            />
        </section>
    )
}

const mapState = store => ({
    user: store.user.user
})

const mapDispatch = dispatch => ({
    dispatchError: (errorMsg) => {
        dispatch(showError(errorMsg))
    },

    dispatchSuccess: (msg) => {
        dispatch(showSuccess(msg))
    }
})

const Post = connect(mapState, mapDispatch)(PostView)

export default Post