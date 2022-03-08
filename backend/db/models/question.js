'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    ownerId: DataTypes.INTEGER,
    question: DataTypes.TEXT
  }, {});
  Question.associate = function(models) {
    Question.belongsTo(models.User, { foreignKey: 'ownerId' });
    Question.hasMany(models.Answer, { foreignKey: 'questionId' });
  };
  return Question;
};
