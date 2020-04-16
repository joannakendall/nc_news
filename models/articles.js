const connection = require('../db/connection')

exports.getArticle = ({article_id}) => {
    return connection('articles') 
    .select('articles.*')
    .join('comments', 'articles.article_id','=', 'comments.article_id')
    .groupBy('articles.article_id')
    .count('articles.article_id as comment_count')
    .modify((articleQuery) => {
        if(article_id) articleQuery.where({'articles.article_id': article_id})
    })
    .then((article) => {
        if(article.length === 0)
            return Promise.reject({ status: 404, msg: 'Article Not Found'});
        return article[0];
    })
}


exports.updateArticle = (article_id, inc_votes) => {
    return connection('articles')
        .increment('votes', inc_votes)
        .where({ article_id })
        .returning('*')
        .then(article => {
            return article[0];
        });
} 

// SELECT articles.*, COUNT(articles.article_id) AS comment_count  FROM articles
// LEFT JOIN comments ON
// articles.article_id = comments.article_id
// WHERE articles.article_id = 1
// GROUP BY articles.article_id
// ;