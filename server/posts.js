const { genId, getDate } = require('./utils')
const { writeDb, deletePostFromDb } = require('./db')
const idBytes = 8

const postArticle = (req, res) => {
    const { title, content } = req.body
    console.log('file', req.file)
    if (!title || !content || !req.file) {
        return res.status(403).send( { error: true, 
                                errorMsg: 'Missing form field' })
    } 

    const db = require('./db.json')
    
    const userId = req.user
    const postId = genId(idBytes)

    const post = {
        postId,
        title,
        content,
        authorId: userId,
        thumbnail: "\\" + req.file.path,
        date: getDate(),
        comments: []
    }

    db.Users[userId].posts.push(postId)
    db.Posts[postId] = post

    const newDb = JSON.stringify(db);
    writeDb(newDb).then(result => {
        if (result.err) {
                return res.status(500).send( {error: true,
                                    errorMsg: result.errorMsg })
        }
        console.log('post published', post)
        return res.status(200).send( { error: false,
                                    msg: 'Successfully published' })
    })
}

const getPosts = (req, res) => {
    const { Posts } = require('./db.json')

    res.status(200).send({ error: false, posts: Posts })
}

const getSinglePost = (req, res) => {
    const { Posts, Users} = require('./db.json')

    const id = req.params.postId
    if (!id)
    {
        res.status(406).send({error: true,
            errorMsg: 'Missing post\'s id'})
        return
    }

    const post = Posts[id];
    if (!post)
    {
        res.status(406).send({ error: true,
            errorMsg: 'No such post exists' })
        return
    }

    const user = Users[post.authorId]
    post.author = {
        username: post.authorId,
        profilePic: user.profilePic
    }
    res.status(200).send({ error: false, post })
}

const deletePost = (req, res) => {
    const postId = req.params.postId
    if (!postId) {
        res.status(400).send({ error: true, errorMsg: 'No post id presented'})
        return
    }

    const Posts = require('./db.json').Posts
    const post = Posts[postId]
    if (!post) {
        res.status(400).send({ error: true, errorMsg: 'No such post exists'})
        return
    }

    if (post.authorId !== req.user) {
        res.status(400).send({ error: true, errorMsg: 'No rights to do that`'})
        return
    }

    deletePostFromDb(postId)
    res.send({ error: false })
}

module.exports = {
    postArticle,
    getPosts,
    getSinglePost,
    deletePost
}