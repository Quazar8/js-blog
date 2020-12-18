import React from 'react'
import { Link } from 'react-router-dom'

const CreatePostLink = () => {
    return (
        <Link 
         to = "/create/post"
         className = "create-post-link">
            <svg className = "create-post-svg" viewBox = "0 0 50 50">
                <line x1="0" y1="25" x2="50" y2="25"/>
                <line x1="25" y1="0" x2="25" y2="50"/>
            </svg>
        </Link>
    )
}

export default CreatePostLink