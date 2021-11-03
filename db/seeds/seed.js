const db = require('../connection.js');
const format = require('pg-format');


const seed = (data) => {
  const { articleData, commentData, topicData, userData } = data;
  return db
  .query(`DROP TABLE IF EXISTS comments;`)
  .then(() => {
    return db
    .query(`DROP TABLE IF EXISTS articles;`)
  })
  .then(() => {
    return db
    .query(`DROP TABLE IF EXISTS topics;`)
  })
  .then(() => {
    return db
    .query(`DROP TABLE IF EXISTS users;`)
  })
  .then(() => {
    return db
    .query(`
        CREATE TABLE topics (
          slug VARCHAR PRIMARY KEY,
          description TEXT
        );`);
      })
  .then(() => {
    return db
    .query(`
    CREATE TABLE users (
      username VARCHAR PRIMARY KEY,
      avatar_url VARCHAR NOT NULL,
      name VARCHAR NOT NULL
    );`)
    })
    .then(() => {
      return db
      .query(`
    CREATE TABLE articles (
      article_id SERIAL PRIMARY KEY,
      title VARCHAR NOT NULL,
      body TEXT NOT NULL,
      votes INT  DEFAULT 0,
      topic VARCHAR NOT NULL,
      author VARCHAR NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (topic)  REFERENCES topics(slug),
      FOREIGN KEY (author)  REFERENCES users(username)
    );`)
    })
    .then(() => {
      return db
      .query(`
    CREATE TABLE comments (
      comment_id SERIAL PRIMARY KEY,
      author VARCHAR NOT NULL,
      article_id INT NOT NULL,
      votes INT DEFAULT 0,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      body TEXT NOT NULL,
      FOREIGN KEY (author)  REFERENCES users(username),
      FOREIGN KEY (article_id)  REFERENCES articles(article_id)
    );`)
    })
    .then(() => {

      const queryStr = format(`INSERT INTO topics
      (slug, description)
      VALUES %L RETURNING*;`, topicData.map(item => [
        item.slug,
        item.description
      ]
      ))
      return db.query(queryStr)
    })
    .then(() => {
      const queryStr = format(`INSERT INTO users
      (username, avatar_url, name)
      VALUES %L RETURNING*;`, userData.map(item => [
        item.username,
        item.avatar_url,
        item.name
      ]
      ))
      return db.query(queryStr)
    })
    .then(() => {
      const queryStr = format(`INSERT INTO articles
      (title, body, votes, topic, author, created_at)
      VALUES %L RETURNING*;`, articleData.map(item => [
        item.title,
        item.body,
        item.votes,
        item.topic,
        item.author,
        item.created_at
      ]))
      return db.query(queryStr)
    })
    .then(() => {
      const queryStr = format(`INSERT INTO comments
      (author, article_id, votes, created_at, body)
      VALUES %L RETURNING*;`, commentData.map(item => [
        item.author,
        item.article_id,
        item.votes,
        item.created_at,
        item.body
      ]))
      return db.query(queryStr)
    })

};

module.exports = seed;
