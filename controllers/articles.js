const { getArticle, updateArticle } = require('../models/articles.js')

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