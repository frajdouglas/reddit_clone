const {removeComment} = require('../controllers/comments.controller');
const commentsRouter = require('express').Router();

console.log('IN THE COMMENTS ROUTER')

commentsRouter
.route('/:comment_id')
.delete(removeComment)

module.exports = commentsRouter