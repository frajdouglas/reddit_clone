const apiRouter = require('express').Router();
const topicsRouter = require('./topics-router');
const articlesRouter = require('./articles-router');
const commentsRouter = require('./comments-router');
const {getEndpoints} = require('../controllers/api.controller.js')

console.log('IN THE API ROUTER')

apiRouter
.route('/')
.get(getEndpoints)


apiRouter.use('/topics', topicsRouter);
apiRouter.use('/articles', articlesRouter);
apiRouter.use('/comments', commentsRouter);

module.exports = apiRouter;
