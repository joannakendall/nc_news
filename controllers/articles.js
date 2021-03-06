const { getArticle, updateArticle, insertComment, getAllArticles, getComments, checkAuthorExists, checkTopicExists, checkArticleExists } = require('../models/articles.js')

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
    updateArticle({article_id}, {inc_votes})
    .then( article => {
        res.status(200).send({ article })
    })
    .catch(next)
}

exports.postComment = (req, res, next) => {
     const { article_id } = req.params
     const comment = req.body
    insertComment(article_id, comment).then((comment) => {
        res.status(201).send({ comment })
    })
    .catch(next)
}

exports.sendAllArticles = (req, res, next) => {
    const { topic, author } = req.query;
    if(topic){
        checkTopicExists(req.query).catch(next)
    }
    if(author){
        checkAuthorExists(req.query).catch(next)
    }
    getAllArticles(req.query).then((articles) => {
        res.status(200).send({articles})
    })
    .catch(next)
}

exports.sendComments = (req, res, next) => {
    const { article_id } = req.params;
    if(article_id){
        checkArticleExists(req.params).catch(next)
    }
    getComments({article_id}, req.query).then((comments) => {
        res.status(200).send({comments})
    })
    .catch(next)
}