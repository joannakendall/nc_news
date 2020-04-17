const { getArticle, updateArticle, insertComment, getAllArticles } = require('../models/articles.js')

exports.sendArticle = (req, res, next) => {
    const {article_id} = req.params;
    getArticle({article_id}).then((article) => {
        res.status(200).send({article})
    })
    .catch(next)
}

exports.patchArticle = (req, res, next) => {
    const { inc_votes } = req.body;
    const { article_id } = req.params;
    updateArticle(article_id, inc_votes)
    .then( article => {
        res.status(200).send({ article })
    })
    .catch(next)
}

exports.postComment = (req, res, next) => {
    const { article_id } = req.params
    const comment = req.body
    insertComment(article_id, comment).then ((comment) => {
        res.status(201).send({ comment })
    })
    .catch(next)
}

exports.sendAllArticles = (req, res, next) => {
    getAllArticles(req.query).then((articles) => {
        res.status(200).send({articles})
    })
    .catch(next)
}