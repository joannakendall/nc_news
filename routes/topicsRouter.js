const topicsRouter = require('express').Router();
const { sendTopics } = require('../controllers/topics')
const { handle405s } = require('../errors')

topicsRouter.route('/').get(sendTopics).all(handle405s)

module.exports = topicsRouter;