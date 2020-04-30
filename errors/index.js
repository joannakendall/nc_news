exports.handle405s = (req, res) => {
    res.status(405).send({ msg : 'Method Not Allowed'});
};

exports.handlePSQLErrors = (err, req, res, next) => {
    if(err.code) {
        const badRequestsCodes = ['22P02', '42703'];
        if(badRequestsCodes.includes(err.code)){
            res.status(400).send({msg: 'Bad Request'});
        }
    } else {
        next(err)
    }
}

exports.handleCustomErrors = (err, req, res, next) => {
    if(err.status){
        res.status(err.status).send({ msg: err.msg })
    } else {
        next(err)
    }
};

exports.handleInvalidPaths = (req, res, next) => {
    res.status(404).send({ msg: 'Path Not Found' })
}

exports.handle500s = (err, req, res, next) => {
    console.log(err)
    res.status(500).send({ msg: 'Server Error'});
};