const { getTopics } = require('../controllers/topics.controller');
const topicsRouter = require('express').Router();

console.log('In the TOPICS ROUTER')

topicsRouter
.route('/')
.get(getTopics)

module.exports = topicsRouter