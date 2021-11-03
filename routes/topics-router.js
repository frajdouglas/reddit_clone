const { getTopics } = require('../controllers/api.controller');
const topicsRouter = require('express').Router();

topicsRouter
.route('/')
.get(getTopics)

module.exports = topicsRouter