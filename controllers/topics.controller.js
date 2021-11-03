const {selectTopics} = require('../models/topics.model')




exports.getTopics = (req,res,next) => {
    console.log("In Controllers getTopics")
    selectTopics()
    .then((databaseResponse) => {
        console.log("In the controller")
        res.status(200).send(databaseResponse);
    })
}