const articlesRouter = require('express').Router();
const { sendArticle, patchArticle, postComment, sendAllArticles, sendComments } = require('../controllers/articles')

articlesRouter.route('/:article_id')
    .get(sendArticle)
    .patch(patchArticle)

articlesRouter.route('/')
    .get(sendAllArticles)


articlesRouter.route('/:article_id/comments')
    .post(postComment)
    .get(sendComments)


module.exports = articlesRouter;