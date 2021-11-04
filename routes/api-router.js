const apiRouter = require('express').Router();
const topicsRouter = require('./topics-router');
const articlesRouter = require('./articles-router');

console.log('In the api-router')

apiRouter.use('/topics', topicsRouter);
apiRouter.use('/articles', articlesRouter);


module.exports = apiRouter;
