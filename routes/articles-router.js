const {getArticles, patchArticle, getAllArticles} = require('../controllers/articles.controller');
const articlesRouter = require('express').Router();


console.log('In the articles-router')


articlesRouter
.route('/')
.get(getAllArticles)

articlesRouter
.route('/:article_id')
.get(getArticles)
.patch(patchArticle)

module.exports = articlesRouter