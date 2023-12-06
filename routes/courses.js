'use strict';

const {
    asyncHandler
} = require('../middleware/async-handler');
const {
    authenticateUser
} = require('../middleware/auth-user');


// load modules
const express = require('express');
const bcrypt = require('bcrypt')

const router = express.Router();
const {
    User
} = require('../models/user.js')
const {
    Course
} = require('../models/course.js')


router.get('/', asyncHandler(async (req, res) => {
    let courses = await Course.findAll({
        include: [{
            model: User
        }]
    })
    res.json(courses)
}))



module.exports = router;