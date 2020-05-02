const connection = require("../db/connection");

exports.getArticle = ({ article_id }) => {
  return connection("articles")
    .select("articles.*")
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
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

exports.updateArticle = ({article_id}, {inc_votes}) => {
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
  topic,
}) => {
  return connection("articles")
    .select("articles.*")
    .orderBy(sort_by, order)
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .groupBy("articles.article_id")
    .count("comments.article_id as comment_count")
    .modify((queryBuilder) => {
        if (author) queryBuilder.where({'articles.author': author}) 
        if (topic) queryBuilder.where({topic});
      })
};

exports.checkAuthorExists = ({author}) => {
  return connection('users')
    .select('*')
    .where('username', author)
    .then((existingAuthor) => {
      if(!existingAuthor.length){
        return Promise.reject({status:404, msg: "Author Not Found"})
      }
      return existingAuthor[0];
    })
  
};

exports.checkTopicExists = ({topic}) => {
  return connection('topics')
    .select('*')
    .where('slug', topic)
    .then((existingTopic) => {
      if(!existingTopic.length){
        return Promise.reject({status:404, msg: "Topic Not Found"})
      }
      return existingTopic[0];
    })
  
};

exports.getComments = ({article_id, sort_by = "created_at",
order = "desc"}) => {
    return connection('comments')
        .select('comment_id', 'votes', 'created_at', 'author', 'body')
        .orderBy(sort_by, order)
        .modify((articleQuery) => {
            if (article_id) articleQuery.where({ article_id });
          })
        .then(comments => {
            return comments
        })
}
