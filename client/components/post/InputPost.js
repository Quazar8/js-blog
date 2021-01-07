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

    const imageRef = useRef()
    const handleImageInput = (e) => {
        const file = e.target.files[0]

        imageRef.current.src = URL.createObjectURL(file)
        setLabelText('')
    }

    const clearUrlObject = () => {
        URL.revokeObjectURL(imageRef.current.src)
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
                    <label id = "thumbnail-label">
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