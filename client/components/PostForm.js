import React, { useState, createRef } from 'react'
import { connect } from 'react-redux'

import { publishPostAction } from '../store/postsActions'

const PostFormView = ({ tryPublishPost }) => {
    const [inputs, setInputs] = useState({
        title: '',
        content: '',
    })

    const imageInput = createRef()

    const handleTitleCHange = (e) => {
       setInputs({
           ...inputs,
           title: e.target.value
       })
    }
    
    const handleContentCHange = (e) => {
       setInputs({
           ...inputs,
           content: e.target.value
       })
    }

    const handleSubmit = e => {
        e.preventDefault()

        const data = {
            ...inputs,
            thumbnail: imageInput.current.files[0]
        }
        tryPublishPost(data)
    }

    return (
        <form onSubmit = { handleSubmit }>
            <div className = "field-container">
                <label htmlFor = "title">Title</label>
                <input id = "title" value = { inputs.title } 
                onChange = { handleTitleCHange }
                name = "title"
                />
            </div>
            <div>
                <textarea cols = "20" rows = "10"
                onChange = { handleContentCHange }
                name = "content"
                ></textarea>
            </div>
            <div>
                <input type = "file" id = "thumbnail" 
                name = "thumbnail"
                ref = { imageInput }
                />
            </div>
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