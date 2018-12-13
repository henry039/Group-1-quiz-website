
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
      .then(function () {
        // Inserts seed entries
        return knex('users').insert({
            username: 'user',
            email: 'user@gmail.com',
            password: '$2a$10$Dqhl0DVLav3i6gjTfK9Qt.gg0AQCJDbbocnVcyYO39trPNzOnzu1y'
        })
      });
};
