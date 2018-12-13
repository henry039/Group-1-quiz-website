
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
            table.text('description');
            table.dateTime('dateTime');
            table.integer('userId').references('users.id');
        })

        await trx.schema.createTable('questions',(table)=>{
            table.integer('id');
            table.integer('time')
            table.string('question');
            table.json('answers');
            table.integer('userId').references('users.id');
            table.integer('quizId').references('quizzes.id'); 
        })

        await trx.schema.createTable('records',(table)=>{
            table.increments('id');
            table.dateTime('dateTime');
            table.integer('userId').references('users.id');
            table.integer('quizId').references('quizzes.id'); 
        })
        
        await trx.schema.createTable('results',(table)=>{
            table.string('playerName');
            table.integer('questionId')
            table.json('answer');
            table.integer('userId').references('users.id');
            table.integer('recordId').references('records.id');
        })

    })
};

exports.down = function(knex, Promise) {
    return knex.transaction(async(trx)=>{
        await trx.schema.dropTable('results');
        await trx.schema.dropTable('records');
        await trx.schema.dropTable('questions');
        await trx.schema.dropTable('quizzes');
        await trx.schema.dropTable('users');
    })
};
