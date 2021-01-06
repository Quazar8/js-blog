import React from 'react'

const InputPost = () => {
    const { thumbnail, authorId, title, content} = {
        thumbnail: '',
        authorId: 'Example Author',
        title: 'Example Title',
        content: 'Example Content'
    }

    return (
        <section className = "post-container">
            <article className = "post-view">
                <div className = "thumbnail-container">
                    <img src = { thumbnail } alt = "thumbnail picture" />
                    <div className = "shader-left"></div>
                    <div className = "shader-bottom"></div>
                    <div className = "shader-right"></div>
                </div>
                <h2>{ title }</h2>
                <h3>Author: { authorId }</h3>
                <p>{ content }</p>
            </article>
        </section>
    )
}

export default InputPost