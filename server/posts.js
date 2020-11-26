const { genId } = require('./utils')

const postArticle = (req, res) => {
   const { title, content } = req.body
   if(!title || !content) {
       return res.status(403).send( { error: true, 
                            errorMsg: 'No title or article body' })
   } 
}

module.exports = {
    postArticle
}