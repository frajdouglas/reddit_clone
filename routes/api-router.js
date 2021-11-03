const apiRouter = require('express').Router();
const topicsRouter = require('./topics-router');
const articlesRouter = require('./articles-router');

// apiRouter.get('/', (req,res) => {
//     res.status(200).send('All working from the API router')
// })

apiRouter.use('/topics', topicsRouter);
apiRouter.use('/articles', articlesRouter);

module.exports = apiRouter;


// () => {"IN THIS ROUTER"}
// anon function for copying into .use methods for debugging