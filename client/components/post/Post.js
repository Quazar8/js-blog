import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getSinglePostServer } from '../../api'

const Post = () => {
    const [post, setPost] = useState({
        title: '',
        content: '',
        thumbnail: '',
        author: {
            username: '',
            profilePic: ''
        }
    })

    useEffect(() => {
        const address = window.location.pathname.split('-')
        const postId = address[address.length - 1]
        if(postId) {
            getSinglePostServer(postId).then(resp => {
                if (resp.error) {
                    console.log('Error retrieeving post')
                    return
                }

                setPost(resp.post)
            })
        }
    }, [])

    if (!post.title) {
        return <h1>No such post exists</h1>
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
        </section>
    )
}

export default Post