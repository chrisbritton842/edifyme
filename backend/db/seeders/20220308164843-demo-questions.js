'use strict';

// NEW
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
// END of new code

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
      options.tableName = 'Questions';
      return queryInterface.bulkInsert(options, [
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
      options.tableName = 'Questions';
      return queryInterface.bulkDelete(options, null, {});
  }
};
