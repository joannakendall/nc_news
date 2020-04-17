const articlesRouter = require('express').Router();
const { sendArticle, patchArticle, postComment, sendAllArticles } = require('../controllers/articles')

articlesRouter.route('/:article_id')
    .get(sendArticle)
    .patch(patchArticle)

articlesRouter.route('/')
    .get(sendAllArticles)


articlesRouter.post('/:article_id/comments', postComment)

module.exports = articlesRouter;