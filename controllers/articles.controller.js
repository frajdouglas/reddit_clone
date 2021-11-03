const {updateArticle, selectArticlesByParam, selectAndGroupByArticles} = require('../models/articles.model')


exports.getAllArticles = (req,res,next) => {
    console.log("In Controllers getAllArticles")
    console.log(req.query)
    //const queries = Object.keys(req.query)
    //const optionValue = req.query[queryType]
    selectAndGroupByArticles(req.query)
    .then((databaseResponse) => {
        res.status(200).send({articles : databaseResponse})
    })
    .catch((err) => {
        next(err)
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
        res.status(201).send({updatedArticle : databaseResponse}) 
    })
    .catch((err) => {
        next(err)
    })
}