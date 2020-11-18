import React from 'react'

const PostForm = () => {
    return (
        <form>
            <div className = "field-container">
                <label for = "title">Title</label>
                <input id = "title" value = "" />
            </div>
            <div>
                <textarea cols = "20" rows = "10"></textarea>
            </div>
            <input type = "submit" value = "Publish" />
        </form>
    )
}

export default PostForm