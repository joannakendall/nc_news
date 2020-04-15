exports.handle500s = (err, req, res, next) => {
    console.log(err)
    res.status(500).send({ msg: 'Server Error'});
};

exports.handleInvalidPaths = (req, res, next) => {
    res.status(404).send({ msg: 'Path Not Found' })
}