const { reverse } = require('../db/data/test-data/articles')
const { selectCommentsByArticle, insertComment, deleteComment } = require('../models/comments.model')
const { handleCustomErrors } = require('./errors.controller')

exports.getCommentsByArticle = (req, res, next) => {
    console.log("IN THE COMMENTS CONTROLLERS FILE IN THE FUNCTION getCommentsByArticle")
    const { article_id } = req.params
    selectCommentsByArticle(article_id)
        .then((rows) => {
            res.status(200).send({ comments: rows })
        })
        .catch((err) => {
            res.status(404).send({ msg: err.msg })
        })
}

exports.addComment = (req, res, next) => {
    console.log("IN THE COMMENTS CONTROLLERS FILE IN THE FUNCTION addComment")
    const { article_id } = req.params
    const { username } = req.body
    const { body } = req.body
    if (req.body.username === undefined || req.body.body === undefined) {
        res.status(400).send({msg : 'Bad request'})
    } else {
        insertComment(article_id, username, body)
            .then((databaseResponse) => {
                res.status(201).send({ addedComment: databaseResponse })
            })
    }
}

exports.removeComment = (req,res,next) => {
    console.log("IN THE COMMENTS CONTROLLERS FILE IN THE FUNCTION removeComment")
    const {comment_id} = req.params
    deleteComment(comment_id)
    .then(() => {
        res.status(204).send()
    })
    .catch((err) => {
        next(err)
    })
}