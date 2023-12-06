'use strict';

const data = require('../seed/data.json')
const { asyncHandler } = require('../middleware/async-handler');
const { authenticateUser } = require('../middleware/auth-user');


// load modules
const express = require('express');
const bcrypt = require('bcrypt')

const router = express.Router();
const { User } = require('../models/user.js')

// Route that returns information of aunthenticated user
router.get('/', authenticateUser, asyncHandler(async (req, res) => {
    const user = req.currentUser;
  
    res.json({
      firstName: user.firstName,
      lastName: user.lastName,
      emailAddress: user.emailAddress,
      password: user.password, 
    });
  }));


// Route that creates a new user.
router.post('/', asyncHandler(async (req, res) => {
    try {
      await User.create(req.body);
      res.status(201).json({ "message": "Account successfully created!" });
    } catch (error) {
      if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
        const errors = error.errors.map(err => err.message);
        res.status(400).json({ errors });   
      } else {
        throw error;
      }
    }
  }));

module.exports = router;