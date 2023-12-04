'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "First name field is required"
        },
        notEmpty: {
          msg: "First name field is required"
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Last name field is required"
        },
        notEmpty: {
          msg: "Last name field is required"
        },
      },
    },
    emailAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "The email address entered is already associated with an existing account"
      },
      validate: {
        notNull: {
          msg: "The email address field is required"
        },
        isEmail: {
          msg: "Please provide a valid email address"
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password field is required"
        },
        notEmpty: {
          msg: "Password field is required"
        }
      },
    },
  }, {
    sequelize,
    modelName: 'User',
  });


  User.associate = (models) => {
    User.hasMany(models.Course, {

      foreignKey: {
        fieldName: "userId"
      }
    })
  }
  return User;
};