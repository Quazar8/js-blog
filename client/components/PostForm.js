import React, { useState } from 'react'
import { connect } from 'react-redux'

import { publishPostAction } from '../store/postsActions'

const PostFormView = ({ tryPublishPost }) => {
    const [inputs, setInputs] = useState({
        title: '',
        content: ''
    })

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
            ...inputs
        }
        tryPublishPost(data)
    }

    return (
        <form onSubmit = { handleSubmit }>
            <div className = "field-container">
                <label for = "title">Title</label>
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
                <input type="file" id="tumbnail" 
                name="thumbnail"
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