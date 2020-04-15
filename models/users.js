const connection = require('../db/connection')

exports.getUser = (username) => {
    //console.log(username, 'in models')
    return connection.where('username', username).select('*').from('users')
}