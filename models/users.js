const connection = require('../db/connection')

exports.getUser = ({username}) => {
    return connection('users')
    .select('*')
    .modify((userQuery) => {
        if(username) userQuery.where({username})
    })
    .then((user) => {
        if(user.length === 0)
            return Promise.reject({ status: 404, msg: 'User Not Found'});
        return user[0];
    })
}