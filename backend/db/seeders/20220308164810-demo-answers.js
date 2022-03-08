'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
      return queryInterface.bulkInsert('Answers', [
        {
          userId: 1,
          questionId: 3,
          answer: "For this problem, you first need to multiply both sides by the denominator on the left side and then expand each polynomial."
        },
        {
          userId: 3,
          questionId: 2,
          answer: "You usually include your thesis statement in the last sentence of the first paragraph."
        },
        {
          userId: 2,
          questionId: 1,
          answer: "Earth is approximately 93 million miles from the sun."
        }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
      return queryInterface.bulkDelete('Answers', null, {});
  }
};
