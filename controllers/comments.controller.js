const { reverse } = require('../db/data/test-data/articles')
const {selectCommentsByArticle} = require('../models/comments.model')

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