const { getTopics } = require('../models/topics.js')

exports.sendTopics = (req,res,next) => {
    getTopics().then((topics) => {
        console.log(topics)
        res.status(200).send({ topics})
    })
};