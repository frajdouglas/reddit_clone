const {getArticles, patchArticle} = require('../controllers/api.controller');
const articlesRouter = require('express').Router();

articlesRouter
.route('/:article_id')
.get(getArticles)
.patch(patchArticle)

module.exports = articlesRouter