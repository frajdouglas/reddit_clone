const { getTopics } = require('../controllers/topics.controller');
const topicsRouter = require('express').Router();

console.log('In the topics-router')

topicsRouter
.route('/')
.get(getTopics)

module.exports = topicsRouter