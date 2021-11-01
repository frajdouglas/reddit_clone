const db = require('../connection.js');
//const data = require('../data/development-data');
const format = require('pg-format');
const { dataManipulation } = require('../../utils/utils.js')


const seed = (data) => {
  console.log("IN THE SEED FUNCTION")
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

      Promise.all([db.query(`
                  CREATE TABLE topics (
                    topic_id SERIAL PRIMARY KEY,
                    slug VARCHAR NOT NULL,
                    description TEXT
                  );`),
      db.query(`
                  CREATE TABLE users (
                    user_id SERIAL PRIMARY KEY,
                    username VARCHAR NOT NULL,
                    avatar_url VARCHAR NOT NULL,
                    name VARCHAR NOT NULL
                  );`)
      ])
        .then(() => {
          return db
            .query(`
    CREATE TABLE articles (
      article_id SERIAL PRIMARY KEY,
      title VARCHAR NOT NULL,
      body TEXT NOT NULL,
      votes INT  DEFAULT 0,
      topic VARCHAR NOT NULL,
      topic_id INT NOT NULL,
      author VARCHAR NOT NULL,
      author_id INT NOT NULL,
      created_at TIMESTAMP NOT NULL,
      FOREIGN KEY (topic_id)  REFERENCES topics(topic_id),
      FOREIGN KEY (author_id)  REFERENCES users(user_id)
    );`)
        })
        .then(() => {
          return db
            .query(`
    CREATE TABLE comments (
      comment_id SERIAL PRIMARY KEY,
      author VARCHAR NOT NULL,
      author_id INT NOT NULL,
      article_id INT NOT NULL,
      votes INT DEFAULT 0,
      created_at TIMESTAMP NOT NULL,
      body TEXT NOT NULL,
      FOREIGN KEY (author_id)  REFERENCES users(user_id),
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
        .then(({ rows }) => {

          console.log(rows)
          const result = dataManipulation(rows,)
        })

      // 1. create tables
      // 2. insert data
    };

  module.exports = seed;



// const word1 = 'hello';
// const word2 = 'world';

// Promise.all([word1, word2]).then((words) => {
//   console.log(words); // ['hello', 'world']
// });