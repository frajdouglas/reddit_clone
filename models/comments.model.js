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