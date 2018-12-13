
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
    return knex('quizzes').del()
      .then(function () {
        // Inserts seed entries 
        return knex('quizzes').insert({
            topic: 'EASY',
            description: 'Dummy can do it ?',
            userId: 1,
            dateTime: knex.fn.now(3)
        });
    });
};
