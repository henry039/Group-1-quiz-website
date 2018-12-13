
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
    return knex('questions').del()
      .then(function () {
        // Inserts seed entries 
        return knex('questions').insert([
          {
            id : 1,
            time: '15',
            question: 'Apple is a ?',
            answers : JSON.stringify(
              [{"answer":"Fruit","correct":true},{"answer":"Venue","correct":false},{"answer":"Tool","correct":false}]),
            userId: 1,
            quizId: 1
          },
          {
            id : 2,
            time: '10',
            question: 'DO you look good ?',
            answers : JSON.stringify(
              [{"answer":"No","correct":false},
              {"answer":"Yes","correct":true}]),
            userId: 1,
            quizId: 1
          }
      ]);
    });
};
