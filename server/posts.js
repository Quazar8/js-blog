const { genId, getDate } = require('./utils')
const { writeDb } = require('./db');
const { json } = require('express');
const idBytes = 8;

const postArticle = (req, res) => {
   const { title, content } = req.body
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

module.exports = {
    postArticle
}