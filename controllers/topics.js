const { getTopics } = require('../models/topics.js')

exports.sendTopics = (req,res,next) => {
    getTopics().then((topics) => {
        res.status(200).send({ topics})
    })
    .catch((err) => {
        console.log(err)
    })
};