import React, { createRef } from 'react'
import { connect } from 'react-redux'

import { publishPostAction } from '../store/postsActions'

const PostFormView = ({ tryPublishPost }) => {
    const titleRef = createRef()
    const contentRef = createRef()
    const imageInput = createRef()

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
            <input type = "file" id = "thumbnail" 
                name = "thumbnail"
                ref = { imageInput }
            />
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