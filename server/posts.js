const { genId, getDate } = require('./utils')
const { writeDb } = require('./db');
const idBytes = 8;

const postArticle = (req, res) => {
   const { title, content } = req.body
   console.log('file', req.file)
   
   res.status(200).send({error: false, title, content})
   return
   if(!title || !content) {
       return res.status(403).send( { error: true, 
                            errorMsg: 'No title or article body' })
   } 

   const db = require('./db.json')
   
   const userId = req.user
   const postId = genId(idBytes)

   const post = {
       postId,
       title,
       content,
       authorId: userId,
       date: getDate()
   }

   db.Users[userId].posts.push(postId)
   db.Posts[postId] = post

   const newDb = JSON.stringify(db);
   writeDb(newDb).then(result => {
       if (result.err) {
            return res.status(500).send( {error: true,
                                  errorMsg: result.errorMsg })
       }

       return res.status(200).send( { error: false,
                                msg: 'Successfully published' })
   })
}

const getPosts = (req, res) => {
    const { Posts } = require('./db.json')

    res.status(200).send({ error: false, posts: Posts })
}

const getSinglePost = (req, res) => {
    const { Posts } = require('./db.json')

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

    res.status(200).send({ error: false, post })
}

module.exports = {
    postArticle,
    getPosts,
    getSinglePost
}