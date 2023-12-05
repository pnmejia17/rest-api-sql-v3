'use strict';

const data = require('../seed/data.json')
const { asyncHandler } = require('../middleware/async-handler');
const { authenticateUser } = require('../middleware/auth-user');


// load modules
const express = require('express');
const bcrypt = require('bcrypt')

const router = express.Router();
const { User } = require('../models/user.js')

// ASYNC HANDLER

// handler function to wrap each route 
// replaces try/catch blocks for 
// better code readability 

// function asyncHandler(cb) {
//     return async (req, res, next) => {
//         try {
//             await cb(req, res, next)
//         } catch (error) {
//             next(error)
//         }
//     }
// }


// returns a list of user

// Route that returns a list of users.
router.get('/', authenticateUser, asyncHandler(async (req, res) => {
    const user = req.currentUser;
  
    res.json({
      firstName: user.firstName,
      lastName: user.lastName,
      emailAddress: user.emailAddress,
      password: user.password, 
    });
  }));


module.exports = router;