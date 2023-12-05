'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Course.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Title field is required"
        },
        notNull: {
          msg: "Title is required"
        }
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Description field is required"
        },
        notNull: {
          msg: "Description field is required"
        }
      },
    },
    estimatedTime: DataTypes.STRING,
    materialsNeeded: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Course',
  });


  Course.associate = (models) => {
    Course.belongsTo(models.User, {
      foreignKey:  "userId"
    })
  }
  return Course;
}