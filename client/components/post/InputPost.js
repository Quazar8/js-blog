import React, { useRef, useState } from 'react'
import { connect } from 'react-redux'

const InputPostView = ({ user }) => {
    const [labelText, setLabelText] = useState('Choose a thumbnail image')
    const [labelClass, setLabelClass] = useState('')

    const imageRef = useRef()
    const titleRef = useRef()
    const contentRef = useRef()

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
                <h2 
                    placeholder = "Title" 
                    contentEditable
                    ref = { titleRef }
                >
                </h2>
                <h3>Author: { user.username }</h3>
                <p>
                    <textarea ref = { contentRef } placeholder = "Post Content" />
                </p>
                <div className = "button-container">
                    <button>Publish!</button>
                    <button>Publish!</button>
                    <button>Publish!</button>
                </div>
            </article>
        </section>
    )
}

const mapState = store => ({
    user: store.user.user
})

const InputPost = connect(mapState)(InputPostView)

export default InputPost