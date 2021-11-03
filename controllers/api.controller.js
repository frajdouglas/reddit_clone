const {selectTopics, updateArticle} = require('../models/api.model')
const {selectArticlesByParam} = require('../models/api.model')


exports.getTopics = (req,res,next) => {
    console.log("In Controllers getTopics")
    selectTopics()
    .then((databaseResponse) => {
        console.log("In the controller")
        //console.log(databaseResponse, "Database Response")
        res.status(200).send(databaseResponse);
    })
}

exports.getArticles = (req,res,next) => {
    console.log("In Controllers getArticles")
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
    console.log("In Controllers patchArticle")

    console.log(req.body)
    const {inc_votes} = req.body

    const {article_id} = req.params 
    console.log(inc_votes,"PATCHDATA")
    
    updateArticle(inc_votes,article_id)
    .then((databaseResponse) => {
        console.log(databaseResponse)
        res.status(201).send({updatedArticle : databaseResponse}) 
    })
    .catch((err) => {
        next(err)
    })
}