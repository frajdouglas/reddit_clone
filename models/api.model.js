const db = require('../db/connection.js');

exports.selectTopics = () => {
    console.log("In selectTopics")
    return db.query(`SELECT * FROM topics;`)
        .then(({ rows }) => {
            console.log(rows)
            return rows
        })
}

exports.selectArticlesByParam = (article_id) => {
    console.log("In Models selectArticlesByParam")
    const queryStatement = `SELECT * FROM articles WHERE article_id = $1`
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
        .then((rows) => {

            const queryStatement = `SELECT COUNT(comment_id) FROM comments WHERE article_id = $1 GROUP BY article_id;`
            return Promise.all([db.query(queryStatement, [article_id]), rows])
        })
        .then((results) => {
            let numberCommentCount = Number(results[0]['rows'][0]['count'])
            let finalResponse = results[1][0]
            finalResponse.comment_count = numberCommentCount
            return finalResponse
        })
}

exports.updateArticle = (patchData, article_id) => {
    console.log("In Models updateArticle")
    const queryStatement = `UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;`
    console.log(queryStatement)
    return db.query(queryStatement, [patchData, article_id])
        .then((results) => {
            if (results.rows[0].votes === null) {
                return Promise.reject({
                    status: 400,
                    msg: 'Bad request'
                })
            }
            return rows

        })
}
