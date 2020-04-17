const connection = require("../db/connection");

exports.getArticle = ({ article_id }) => {
  return connection("articles")
    .select("articles.*")
    .join("comments", "articles.article_id", "=", "comments.article_id")
    .groupBy("articles.article_id")
    .count("articles.article_id as comment_count")
    .modify((articleQuery) => {
      if (article_id) articleQuery.where({ "articles.article_id": article_id });
    })
    .then((article) => {
      if (article.length === 0)
        return Promise.reject({ status: 404, msg: "Article Not Found" });
      return article[0];
    });
};

exports.updateArticle = (article_id, inc_votes) => {
  return connection("articles")
    .increment("votes", inc_votes)
    .where({ article_id })
    .returning("*")
    .then((article) => {
      return article[0];
    });
};

exports.insertComment = (article_id, comment) => {
    const newComment = {
        article_id: article_id,
        author: comment.username,
        body: comment.body
    };
    return connection
    .insert(newComment).into('comments')
    .returning('*')
    .then((comment) => {
        return comment[0];
    })
}

exports.getAllArticles = ({
  sort_by = "created_at",
  order = "desc",
  author,
  topic
}) => {
  return connection("articles")
    .select("articles.*")
    .orderBy(sort_by, order)
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .groupBy("articles.article_id")
    .count("articles.article_id as comment_count")
    // .modify((queryBuilder) => {
    //     if (author) queryBuilder.where({author})
    //     if (topic) queryBuilder.where({topic});
    //   })
    .then((articles) => {
        if (articles.length === 0) 
        return Promise.reject({ status: 400, msg: "Column Not Found" })
      return articles;
    });
};
