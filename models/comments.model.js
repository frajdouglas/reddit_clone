const db = require('../db/connection.js')


exports.selectCommentsByArticle = (article_id) => {

    const queryStatement = `SELECT * FROM comments WHERE article_id = $1;`


    return db.query(queryStatement,[article_id])
    .then(({rows}) => {

        if (rows.length === 0) {
            return Promise.reject({
                status: 404,
                msg: 'Article_id does not exist'
            })
        }
        return rows
    })
}

exports.insertComment = (article_id,username,body) => {
    console.log("In the comments model insert comment function")
    console.log(article_id,username,body)
    const queryStatement = `INSERT INTO comments (article_id,author,body) VALUES ($1,$2,$3) RETURNING *;`
    return db.query(queryStatement,[article_id,username,body])
    .then(({rows}) => {
        return rows
    })
}