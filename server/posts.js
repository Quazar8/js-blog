const { genId } = require('./utils')
const idBytes = 8;

const postArticle = (req, res) => {
   const { title, content } = req.body
   if(!title || !content) {
       return res.status(403).send( { error: true, 
                            errorMsg: 'No title or article body' })
   } 

   const db = require('./db.json')
   const postId = genId(idBytes)
   const userId = req.user
}

module.exports = {
    postArticle
}