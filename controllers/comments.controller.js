const { reverse } = require('../db/data/test-data/articles')
const {selectCommentsByArticle, insertComment} = require('../models/comments.model')

exports.getCommentsByArticle = (req, res, next) => {
    console.log("In the COMMENTS CONTROLLER in the getCommentsByArticle Function")
    console.log(req.params)
    const {article_id} = req.params
    console.log(article_id)
    selectCommentsByArticle(article_id)
    .then((rows) => {
        res.status(200).send({comments : rows})
    })
    .catch((err) => {
        res.status(404).send({msg : err.msg})
    })
}

exports.addComment = (req,res,next) => {
    console.log("In the COMMENTS CONTROLLER in the addComment Function")

    const {article_id} = req.params
    const {username} = req.body
    const {body} = req.body

    insertComment(article_id,username,body)
    .then((databaseResponse) => {
        console.log(databaseResponse)

        
        res.status(201).send({addedComment : databaseResponse})
    })
    

    // BAD PATH HANDLING
    // const postKeys = Object.keys(postData)

    // if(postKeys[0] !== 'username' || postKeys[1] !== 'body') {
    //     res.status(400).send({msg : 'Bad post object'})
    // }

}