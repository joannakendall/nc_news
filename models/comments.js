const connection = require('../db/connection')

exports.updateComment = (comment_id, inc_votes = 0) => {
    return connection('comments')
        .increment('votes', inc_votes)
        .where({ comment_id })
        .returning('*')
        .then(comment => {
            if(comment.length === 0)
                return Promise.reject({ status: 404, msg: 'Comment Not Found'});
            return comment[0];
        });
} 

exports.deleteComment = (comment_id) => {
    return connection('comments')
        .del()
        .where({comment_id})
        .returning('*')
        .then(comment => {
            if(comment.length === 0)
                return Promise.reject({ status: 404, msg: 'Comment Not Found'});
            return comment;
        });;
}