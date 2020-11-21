import React, { useState } from 'react'
import { connect } from 'react-redux'

import { publishPostAction } from '../store/postsActions'

const PostFormView = () => {
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

    return (
        <form>
            <div className = "field-container">
                <label for = "title">Title</label>
                <input id = "title" value = "" 
                onChange = { handleTitleCHange }/>
            </div>
            <div>
                <textarea cols = "20" rows = "10"
                onChange = { handleContentCHange }></textarea>
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