\c nc_news_test


SELECT articles.*, COUNT(articles.article_id) AS comment_count  FROM articles
LEFT JOIN comments ON
articles.article_id = comments.article_id
WHERE articles.article_id = 1
GROUP BY articles.article_id
;

SELECT * FROM comments


-- , COUNT(articles.article_id) AS comment_count 
-- LEFT JOIN comments ON
-- articles.article_id = comments.article_id
-- GROUP BY articles.article_id;
