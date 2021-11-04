
exports.handleCustomErrors = (err, req, res, next) => {
    console.log("IN THE ERRORS CONTROLLERS FILE IN THE FUNCTION handleCustomErrors")
    if (err.status === 400 && err.msg === 'Bad request'){
        res.status(400).send({ msg: err.msg })
    }
    
    if(err.code === '22P02') {
        res.status(400).send({ msg: 'Invalid Input' })
    }
    if (err.status && err.msg) {
        res.status(404).send({ msg: err.msg })
    } else {
        next(err)
    }
}

exports.handle500Errors = (err, req, res, next) => {
    console.log("IN THE ERRORS CONTROLLERS FILE IN THE FUNCTION handle500Errors")
        res.status(500).send({ msg: 'Internal server error' })
}
