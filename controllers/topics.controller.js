const {selectTopics} = require('../models/topics.model')




exports.getTopics = (req,res,next) => {
    console.log("IN THE COMMENTS CONTROLLERS FILE IN THE FUNCTION getTopics")
    selectTopics()
    .then((databaseResponse) => {
        res.status(200).send(databaseResponse);
    })
}