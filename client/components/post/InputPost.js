import React, { useRef, useState } from 'react'

const InputPost = () => {
     const post = {
        title: '',
        content: '',
        authorId: '',
        thumbnail: ''
    }

    const { title, content, authorId, thumbnail } = post

    const [labelText, setLabelText] = useState('Choose a thumbnail image')
    const [labelClass, setLabelClass] = useState('')

    const imageRef = useRef()
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
        clearLabelClass()
        setLabelText('')
    }

    const clearUrlObject = () => {
        URL.revokeObjectURL(imageRef.current.src)
    }

    const clearLabelClass = () => {
        setLabelClass('')
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
                <h2>
                    <textarea placeholder = "Title" />
                </h2>
                <h3>Author: { authorId }</h3>
                <p>
                    <textarea placeholder = "Post Content" />
                </p>
            </article>
        </section>
    )
}

export default InputPost