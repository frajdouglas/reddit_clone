const { query } = require('../db/connection.js');
const db = require('../db/connection.js');

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
            return results.rows
        })
}

exports.selectAndGroupByArticles = (queryObject) => {
    console.log("In Models selectAndGroupByArticles")
    let queryStatement = ''
    let databaseQuery = ''
    let queries = Object.keys(queryObject)
    let queryParams = Object.values(queryObject)
    console.log(queries, "Queries")
    console.log(queryParams, "QueryParams")


    if (queries.length === 0 && queryParams.length === 0) {
        console.log("NO QUERY DETECTED")
        queryStatement = `SELECT articles.article_id, articles.author, articles.title, articles.topic, articles.created_at , articles.votes ,COUNT(comment_id) AS comment_count 
                            FROM articles
                            LEFT JOIN comments
                            ON comments.article_id = articles.article_id
                            GROUP BY articles.article_id;`

        databaseQuery = db.query(queryStatement)

    } else {

        //Parameters are not supported in ORDER BY clauses in psql so must sanitise statements without use of literal inputs.
        let orderColumn = queryObject.sort_by
        let sortDirection = queryObject.order
        let topicFilter = queryObject.topic

        if (orderColumn === '' || orderColumn === undefined) {
            orderColumn = 'created_at'
        }
        if (sortDirection === '' || sortDirection === undefined) {
            sortDirection = 'DESC'
        }
        console.log(orderColumn, "ORDER COLUMN")
        console.log(sortDirection, "SORT DIRECTION")

        if (!['author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count'].includes(orderColumn)) {
            console.log("REJECT ME")
            return Promise.reject({ status: 400, msg: 'Bad request' })
        }

        if (topicFilter === '' || topicFilter === undefined) {
            queryStatement = `SELECT articles.article_id, articles.author, articles.title, articles.topic, articles.created_at , articles.votes ,COUNT(comment_id) AS comment_count 
            FROM articles
            LEFT JOIN comments
            ON comments.article_id = articles.article_id
            GROUP BY articles.article_id
            ORDER BY articles.${orderColumn} ${sortDirection};`

            databaseQuery = db.query(queryStatement)

        } else {
            queryStatement = `SELECT articles.article_id, articles.author, articles.title, articles.topic, articles.created_at , articles.votes ,COUNT(comment_id) AS comment_count 
            FROM articles
            LEFT JOIN comments
            ON comments.article_id = articles.article_id
            WHERE topic = $1
            GROUP BY articles.article_id
            ORDER BY articles.${orderColumn} ${sortDirection};`

            databaseQuery = db.query(queryStatement, [topicFilter])

        }
    }
    console.log(queryStatement, 'QUERYSTATEMENT')
    return databaseQuery
        .then(({ rows }) => {
            return rows
        })
}