import React, { createRef, useState } from 'react'
import { connect } from 'react-redux'

import { publishPostAction } from '../store/postsActions'

const PostFormView = ({ tryPublishPost }) => {
    const [labelTitle, setLabelTitle] 
        = useState('Choose image for thumbnail')

    const titleRef = createRef()
    const contentRef = createRef()
    const imageInput = createRef()

    const handleDragOver = (e) => {
        e.preventDefault()
    }

    const handleDrop = (e) => {
        e.preventDefault()

        let file
        if (e.dataTransfer) {
            file = e.dataTransfer.files[0]
        } else if (e.target) {
            file = e.target.files[0]
        }

        console.log(file)
    }

    const handleSubmit = e => {
        e.preventDefault()

        const data = {
            title: titleRef.current.value,
            content: contentRef.current.value,
            thumbnail: imageInput.current.files[0]
        }
        tryPublishPost(data)
    }

    return (
        <form className = "post-form" onSubmit = { handleSubmit }>
            <input id = "title"
                placeholder = "Title"
                ref = { titleRef }
                name = "title"
                autoComplete = "off"
                autoFocus
            />
            <textarea 
                ref = { contentRef }
                name = "content"
            ></textarea>
            <label onDragOver = { handleDragOver}
                onDrop = { handleDrop } id = "thumbnail">
                <input type = "file"  
                    name = "thumbnail"
                    ref = { imageInput }
                />
                { labelTitle }
            </label>
            <input type = "submit" value = "Publish" />
        </form>
    )
}

const mapDispatch = dispatch => {
    return {
        tryPublishPost: data => {
            dispatch(publishPostAction(data))
        }
    }
}

const PostForm = connect(null, mapDispatch)(PostFormView)

export default PostForm