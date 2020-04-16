const { updateComment, deleteComment } = require('../models/comments.js')

exports.patchComment = (req, res, next) => {
    const { inc_votes } = req.body;
    const { comment_id } = req.params;
    updateComment(comment_id, inc_votes)
    .then( comment => {
        res.status(200).send({ comment })
    })
    .catch(next)
}

exports.deleteCommentById = (req, res, next) => {
    const { comment_id } = req.params;
    deleteComment(comment_id).then(() => {
        res.status(204).send();
    }) 
    .catch(next);      
}