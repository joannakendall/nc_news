const commentsRouter = require('express').Router();
const { patchComment, deleteCommentById } = require('../controllers/comments')
const { handle405s } = require('../errors');

commentsRouter.route('/:comment_id')
    .patch(patchComment)
    .delete(deleteCommentById)
    .all(handle405s);

module.exports = commentsRouter;