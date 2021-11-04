const db = require('../db/connection.js');

exports.selectTopics = () => {
    console.log("IN THE TOPICS CONTROLLERS FILE IN THE FUNCTION selectTopics")
    return db.query(`SELECT * FROM topics;`)
        .then(({ rows }) => {
            return rows
        })
}