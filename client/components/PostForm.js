import React, { useState } from 'react'

const PostForm = () => {
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

export default PostForm