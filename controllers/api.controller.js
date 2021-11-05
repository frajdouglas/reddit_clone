const fs = require("fs").promises

exports.getEndpoints = (req,res,next) => {
return fs.readFile('./endpoints.json',"utf-8")
.then((data) => {
    const parsedData = JSON.parse(data)
    res.status(200).send(parsedData)
})
}