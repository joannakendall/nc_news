const usersRouter = require('express').Router();
const { sendUser } = require('../controllers/users')
const { handle405s } =require('../errors')

usersRouter.route('/:username').get(sendUser).all(handle405s)

module.exports = usersRouter;