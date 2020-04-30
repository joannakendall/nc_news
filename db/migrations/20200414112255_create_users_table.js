
exports.up = function(knex) {
    return knex.schema.createTable('users', (usersTable) => {
        usersTable.string('username').primary().unique();
        usersTable.text('avatar_url');
        usersTable.string('name');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
