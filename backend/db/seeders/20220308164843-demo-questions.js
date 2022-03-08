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
      return queryInterface.bulkInsert('Questions', [
        {
          ownerId: 1,
          question: "What is the distance from Earth to the sun?"
        },
        {
          ownerId: 2,
          question: "How do you organize an essay?"
        },
        {
          ownerId: 3,
          question: "I'm not sure how to go about solving this problem: (x + 7)/(x + 3) = 6. Any suggestions?"
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
      return queryInterface.bulkDelete('Questions', null, {});
  }
};
