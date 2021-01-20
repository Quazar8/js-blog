import React, { useRef, useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { publishPostAction } from '../../store/postsActions'
import { showError } from '../../store/globalActions'
import { getSinglePostServer, editPostServer } from '../../api'

const InputPostFormView = ({ user, tryToPublish, postId, dispatch }) => {
    const [labelText, setLabelText] = useState('Choose a thumbnail image')
    const [labelClass, setLabelClass] = useState('')

    const imageRef = useRef()
    const titleRef = useRef()
    const contentRef = useRef()
    const thumbnailRef = useRef()

    useEffect(() => {
        if (postId) {
            getSinglePostServer(postId).then(resp => {
                if (resp.error) {
                    dispatch(showError(resp.errorMsg))
                    console.error('Error retrieving post', resp.errorMsg)
                    return
                }

                const { title, content, thumbnail } = resp.post
                titleRef.current.innerText = title
                contentRef.current.innerText = content
                imageRef.current.src = thumbnail
                setLabelText('')
            })
        }
    }, [])

    const draggedOver = (e) => {
        e.preventDefault()
        setLabelClass(' thumbnail-dragover')
    }

    const handleImageInput = (e) => {
        e.preventDefault()

        let file
        if (e.dataTransfer) {
            file = e.dataTransfer.files[0]
        } else if (e.target) {
            file = e.target.files[0]
        }

        imageRef.current.src = URL.createObjectURL(file)
        thumbnailRef.current = file;
        clearLabelClass()
        setLabelText('')
    }

    const clearUrlObject = () => {
        URL.revokeObjectURL(imageRef.current.src)
    }

    const clearLabelClass = () => {
        setLabelClass('')
    }

    const getFormData = () => {
        return {
            title: titleRef.current.textContent,
            content: contentRef.current.textContent,
            thumbnail: thumbnailRef.current
        }
    }

    const sendEditedPost = (postId, data) => {
        editPostServer(postId, data)
    }

    const submitPost = () => {
        const data = getFormData()
        if (postId) {
            sendEditedPost(postId, data)
        } else {
            tryToPublish(getFormData())
        }
    }

    return (
        <section className = "post-container input-post">
            <article className = "post-view">
                <div className = "thumbnail-container">
                    <img ref = { imageRef } 
                        src = "" alt = "thumbnail picture"
                        onLoad = { clearUrlObject } 
                    />
                    <div className = "shader-left"></div>
                    <div className = "shader-bottom"></div>
                    <div className = "shader-right"></div>
                    <label 
                        onDragOver = { draggedOver }
                        onDrop = { handleImageInput }
                        onDragLeave = { clearLabelClass } 
                        className = {"thumbnail-label" + labelClass }
                    >
                        <input onChange = { handleImageInput } type = "file" />
                        { labelText }
                    </label>
                </div>
                <h2 
                    placeholder = "Title" 
                    contentEditable
                    ref = { titleRef }
                >
                </h2>
                <h3>
                    Author: 
                    <div className = "author">
                        <span>{ user.username }</span>
                        <img src = { user.profilePic } alt = "author picture" />
                    </div>
                </h3>
                <p 
                    ref = { contentRef }
                    contentEditable
                    placeholder = "Article Content"
                >
                </p>
                <div className = "button-container">
                    <button onClick = { submitPost }>Publish!</button>
                    <button onClick = { submitPost }>Publish!</button>
                    <button onClick = { submitPost }>Publish!</button>
                </div>
            </article>
        </section>
    )
}

const mapState = (store, customProps) => {
    return {
        user: store.user.user,
        postId: customProps?.match?.params?.postId
    }
}

const mapDispatch = dispatch => ({
    tryToPublish: data => {
        dispatch(publishPostAction(data))
    }
})

const InputPostForm = connect(mapState, mapDispatch)(InputPostFormView)

export default InputPostForm