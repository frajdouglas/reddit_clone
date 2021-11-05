const {updateArticle, selectArticlesByParam, selectAndGroupByArticles} = require('../models/articles.model')


exports.getAllArticles = (req,res,next) => {
    console.log("IN THE ARTICLES CONTROLLERS FILE IN THE FUNCTION getAllArticles")
    selectAndGroupByArticles(req.query)
    .then((databaseResponse) => {
        res.status(200).send({articles : databaseResponse})
    })
    .catch((err) => {
        next(err)
    })
}


exports.getArticles = (req,res,next) => {
    console.log("IN THE ARTICLES CONTROLLERS FILE IN THE FUNCTION getArticles")
    const {article_id} = req.params 
    selectArticlesByParam(article_id)
    .then((databaseResponse) => {
        res.status(200).send({articles : databaseResponse})
    })
    .catch((err) => {
        next(err)
    })
}

exports.patchArticle = (req,res,next) => {
    console.log("IN THE ARTICLES CONTROLLERS FILE IN THE FUNCTION patchArticle")
    const {inc_votes} = req.body
    const {article_id} = req.params 
    updateArticle(inc_votes,article_id)
    .then((databaseResponse) => {
        res.status(200).send({updatedArticle : databaseResponse}) 
    })
    .catch((err) => {
        next(err)
    })
}