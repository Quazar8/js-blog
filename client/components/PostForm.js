import React, { createRef, useState, useRef } from 'react'
import { connect } from 'react-redux'

import { publishPostAction } from '../store/postsActions'

const PostFormView = ({ tryPublishPost }) => {
    const [labelTitle, setLabelTitle] 
        = useState('Choose image for thumbnail')
    
    const [appendClass, setAppendClass] = useState('')

    const titleRef = createRef()
    const contentRef = createRef()
    const imageInput = useRef()

    const clearAppendClass = () => {
        setAppendClass('')
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        setAppendClass('thumbnail-dragover')
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setAppendClass('')

        let file
        if (e.dataTransfer) {
            file = e.dataTransfer.files[0]
        } else if (e.target) {
            file = e.target.files[0]
        }

        if (file.name) {
            imageInput.current = file
            setLabelTitle(file.name)
        }
    }

    const handleSubmit = e => {
        e.preventDefault()
        const data = {
            title: titleRef.current.value,
            content: contentRef.current.value,
            thumbnail: imageInput.current
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
            <label class = { appendClass }
                onDragExit = { clearAppendClass}
                onDragOver = { handleDragOver}
                onDrop = { handleDrop } id = "thumbnail"
            >
                <input onChange = { handleDrop } type = "file"  
                    name = "thumbnail"
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