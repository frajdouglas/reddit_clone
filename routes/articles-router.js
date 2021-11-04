const {getArticles, patchArticle, getAllArticles} = require('../controllers/articles.controller');
const {getCommentsByArticle,addComment} = require('../controllers/comments.controller');
const articlesRouter = require('express').Router();

console.log('IN THE ARTICLES ROUTER')

articlesRouter
.route('/')
.get(getAllArticles)

articlesRouter
.route('/:article_id')
.get(getArticles)
.patch(patchArticle)

articlesRouter
.route('/:article_id/comments')
.get(getCommentsByArticle)
.post(addComment)

module.exports = articlesRouter