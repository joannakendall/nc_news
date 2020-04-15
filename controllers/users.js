const {getUser} = require('../models/users.js')


exports.sendUser = (req, res, next) => {
    //console.log(req.params)
    const username = req.params.username;
    getUser(username).then((user) =>
    res.status(200).send({user}))
    .catch((err) => {
        console.log(err)
    })
}