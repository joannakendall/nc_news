const usersRouter = require('express').Router();
const { sendUser } = require('../controllers/users')

usersRouter.get('/:username', sendUser)

module.exports = usersRouter;