const db = require('../db/connection.js')


exports.selectCommentsByArticle = (article_id) => {
    console.log("IN THE COMMENTS MODEL FILE IN THE FUNCTION selectCommentsByArticle")

    const queryStatement = `SELECT * FROM comments WHERE article_id = $1;`

    return db.query(queryStatement, [article_id])
        .then(({ rows }) => {

            if (rows.length === 0) {
                return Promise.reject({
                    status: 404,
                    msg: 'Article_id does not exist'
                })
            }
            return rows
        })
}

exports.insertComment = (article_id, username, body) => {
    console.log("IN THE COMMENTS MODEL FILE IN THE FUNCTION insertComment")
    if (username === undefined || body === undefined) {
        return Promise.reject({
            status: 400,
            msg: 'Bad request'})
        }
        


    const queryStatement = `INSERT INTO comments (article_id,author,body) VALUES ($1,$2,$3) RETURNING *;`
    return db.query(queryStatement, [article_id, username, body])
        .then(({rows}) => {
            return rows
        })
}

exports.deleteComment = (comment_id) => {
    console.log("IN THE COMMENTS MODEL FILE IN THE FUNCTION deleteComment")
    const queryStatement = `DELETE FROM comments WHERE comment_id = $1 RETURNING *;`

    return db.query(queryStatement, [comment_id])
        .then(({ rows }) => {

            if (rows.length === 0) {
                return Promise.reject({
                    status: 404,
                    msg: 'Comment_id does not exist'
                })
            }
            return rows
        })
}