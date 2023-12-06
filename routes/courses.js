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
} = require("../models");

const {
    Course
} = require('../models')

// get courses
router.get('/', asyncHandler(async (req, res) => {
    let courses = await Course.findAll({
        include: [{
            model: User
        }]
    })
    res.json(courses)
}))

// get course by id route
router.get('/:id', asyncHandler(async (req, res) => {
    const course = await Course.findByPk(req.params.id, {
        include: [{
            model: User
        }]
    })
    if (course) {
        res.status(200).json({
            course
        })
    } else {
        next()
    }

}))


// create new course
router.post('/', authenticateUser, asyncHandler(async(req, res) => {
    let course = await Course.create(req.body)
    res.location(`/${course.id}`)
    res.status(201).json()
}))

module.exports = router;