const articlesRouter = require('express').Router();
const { sendArticle, patchArticle } = require('../controllers/articles')

articlesRouter.route('/:article_id')
    .get(sendArticle)
    .patch(patchArticle)

module.exports = articlesRouter;