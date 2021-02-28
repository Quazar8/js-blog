const fs = require('fs')
const path = require('path')
const { genId, getDate, successResponse, errorResponse } = require('./utils')
const { writeDb, getDb } = require('./db')
const uploadImage = require('./upload')
const idBytes = 8

const deleteFile = (file) => {
    if (file) {
        fs.unlink(path.join('./', file.path), () => {
            console.log(file.name + 'deleted')
        })
    }
}

const postArticle = (req, res) => {
    const { title, content } = req.body
    console.log('file', req.file)
    if (!title || !content || !req.file) {
        deleteFile(req.file)
        return res.status(403).send(errorResponse({}, 'Missing form field'))
    } 

    const db = getDb()
    
    const userId = req.user
    const postId = genId(idBytes)

    const post = {
        postId,
        title,
        content,
        authorId: userId,
        thumbnail: "\\" + req.file.path,
        date: getDate(),
        comments: [],
        starsBy: []
    }

    db.Users[userId].posts.push(postId)
    db.Posts[postId] = post

    const newDb = JSON.stringify(db);
    writeDb(newDb).then(result => {
        if (result.err) {
                return res.status(500).send(errorResponse({}, result.errorMsg))
        }
        console.log('post published', post)
        return res.status(200).send(successResponse({}, 'Successfully published'))
    })
}

const getPosts = (req, res) => {
    const { Posts } = getDb()

    res.status(200).send(successResponse({ posts: Posts }, ''))
}

const getSinglePost = (req, res) => {
    const { Posts, Users} = getDb()

    const id = req.params.postId
    if (!id)
    {
        res.status(406).send(errorResponse({}, 'Missing post\'s id'))
        return
    }

    const post = Posts[id];
    if (!post)
    {
        res.status(406).send(errorResponse({}, 'No such post exists'))
        return
    }

    const user = Users[post.authorId]
    post.author = {
        username: post.authorId,
        profilePic: user.profilePic
    }

    if (!post.stars) {
        post.starsBy = []
    }

    res.status(200).send(successResponse({ post }, ''))
}

const deletePost = (req, res) => {
    const postId = req.params.postId
    if (!postId) {
        res.status(400).send(errorResponse({}, 'No post id provided'))
        return
    }

    const jsonDb = getDb()
    const { Posts, Comments } = jsonDb
    const post = Posts[postId]
    if (!post) {
        res.status(400).send(errorResponse({}, 'No such post exists'))
        return
    }

    if (post.authorId !== req.user) {
        res.status(400).send(errorResponse({}, 'No rights to do that'))
        return
    }

    //post deletion logic
    const userPosts = jsonDb.Users[post.authorId].posts
    for (let index in userPosts) {
        if (userPosts[index] === postId) {
            userPosts.splice(index)
            break
        }
    }

    const deleteRepliesRec = idArr => {
        for (let id of idArr) {
            let comment= Comments[id]
            deleteRepliesRec(comment.replies)
            delete Comments[id]
            console.log('deleted comment', id)
        }
    }

    deleteRepliesRec(post.comments)
    delete jsonDb.Posts[postId]

    writeDb(JSON.stringify(jsonDb)).then(resp => {
        if (resp.error) {
            res.status(500).send(errorResponse({}, resp.errorMsg))
            return
        }

        fs.unlink(path.join('./', post.thumbnail), (err) => {
            if (err) {
                console.error('Unable to remove post thumbnail')
                console.error(err)
            }
        })

        res.send(successResponse({}, `${ post.title } successfully deleted`))
    })
}

const editPost = (req, res) => {
    const postId = req.params.postId
    if (!postId) {
        res.status(400).send(errorResponse({}, 'No post id presented'))
        return
    }

    const jsonDb = getDb()
    const { Posts } = jsonDb
    const post = Posts[postId]
    if (!post) {
        res.status(400).send(errorResponse({}, 'No such post exists'))
        return
    }

    if (post.authorId !== req.user) {
        res.status(400).send(errorResponse({}, 'No rights to do that'))
        return
    }

    const applyChangesToPost = (req, res) => {
        const { title, content } = req.body

        if (!title || !content) {
            deleteFile(req.file)
            res.status(403).send(errorResponse({}, 'Missing input fields'))
            return
        }

        post.title = title
        post.content = content
        post.date = getDate()

        if (req.file) {
            fs.unlink(path.join('./', post.thumbnail), () => {})
            post.thumbnail = '\\' + req.file.path
        }
        
        writeDb(JSON.stringify(jsonDb)).then(resp => {
            if (resp.error) {
                res.status(500).send(errorResponse({}, resp.errorMsg))
                return
            }
            
            res.send(successResponse({}, `The article has been edited`))
        })
    }

    uploadImage.single('thumbnail')(req, res, (err) => {
        if (err) {
            console.error('Error uploading post thumbnail', err)
            res.status(500).send(errorResponse({}, 'There has been an error processing the image'))
            return
        }

        applyChangesToPost(req, res)
    })
}

const getUserPosts = (req, res) => {
    const { userId, page } = req.params
    const pageNum = parseInt(page)

    if (isNaN(pageNum) || pageNum < 1) {
        return res.status(400).send(errorResponse({}, 'Page number is invalid'))
    }

    const db = getDb()
    if (!db.Users.hasOwnProperty(userId)) {
        return res.status(400).send(errorResponse({}, 'No such user exists'))
    }

    const user = db.Users[userId]
    const totalPages = Math.ceil(user.posts.length / 10)
    if (pageNum > totalPages) {
        return res.status(400).send(errorResponse({}, 'Page number exceeds the user\'s amount'))
    }

    const startIndex = (pageNum - 1) * 10
    const endIndex = startIndex + 10
    const postsIdsInPage = user.posts.slice(startIndex, endIndex)

    let userPosts = []
    for (let postId of postsIdsInPage) {
        userPosts.push(db.Posts[postId])
    }

    res.status(200).send(successResponse({
        userPosts,
        totalPages
    }, 'Retrieved user posts'))
}

const changePostStar = (req, res) => {
    res.send({ msg: 'Change star rank'})
}

module.exports = {
    postArticle,
    getPosts,
    getSinglePost,
    deletePost,
    editPost,
    getUserPosts,
    changePostStar
}