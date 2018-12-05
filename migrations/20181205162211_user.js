
exports.up = function(knex, Promise) {
    return knex.transaction(async (trx)=>{
        await trx.schema.createTable('users',(table)=>{
            table.increments('id');
            table.string('username');
            table.string('email')
            table.string('password');
        })

        await trx.schema.createTable('quizzes',(table)=>{
            table.increments('id');
            table.string('topic');
            table.integer('userId').references('users.id');
        })

        await trx.schema.createTable('questions',(table)=>{
            table.increments('id');
            table.string('topic');
            table.string('answer');
            table.integer('userId').references('users.id');
            table.integer('quizId').references('quizzes.id'); 
        })
    })
};

exports.down = function(knex, Promise) {
    return knex.transaction(async(trx)=>{
        await trx.schema.dropTable('questions');
        await trx.schema.dropTable('quizzes');
        await trx.schema.dropTable('users');
    })
};
