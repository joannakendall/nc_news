const articlesRouter = require('express').Router();
const { sendArticle, patchArticle, postComment, sendAllArticles, sendComments } = require('../controllers/articles')
const { handle405s } = require('../errors');

articlesRouter.route('/:article_id')
    .get(sendArticle)
    .patch(patchArticle)
    .all(handle405s)

articlesRouter.route('/')
    .get(sendAllArticles)
    .all(handle405s)


articlesRouter.route('/:article_id/comments')
    .post(postComment)
    .get(sendComments)
    .all(handle405s)


module.exports = articlesRouter;