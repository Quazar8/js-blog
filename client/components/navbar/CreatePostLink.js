import React from 'react'
import { Link } from 'react-router-dom'

const CreatePostLink = () => {
    return (
        <Link 
         to = "/create/post"
         className = "nav-links">
            +
        </Link>
    )
}

export default CreatePostLink