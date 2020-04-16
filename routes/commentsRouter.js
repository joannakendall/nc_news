const commentsRouter = require('express').Router();
const { patchComment, deleteCommentById } = require('../controllers/comments')

commentsRouter.route('/:comment_id')
    .patch(patchComment)
    .delete(deleteCommentById)

module.exports = commentsRouter;