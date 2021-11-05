const fs = require("fs").promises

exports.getEndpoints = () => {
return fs.readFile('../endpoints.json')
.then((data) => {
    console.log(data)
})
}