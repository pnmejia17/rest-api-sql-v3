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
router.post('/', authenticateUser, asyncHandler(async (req, res) => {
    let course = await Course.create(req.body)
    res.location(`/${course.id}`)
    res.status(201).json()
}))

// put route for course
router.put('/:id', authenticateUser, asyncHandler(async (req, res) => {
    const course = await Course.findByPk(req.params.id)
    if (course) {
        await course.update(req.body)
        res.status(204).end()
    } else {
        res.status(404).json({
            msg: 'Course Not Found'
        })
    }
}))



// delete route for course
router.delete('/:id', authenticateUser, asyncHandler(async (req, res) => {
    const course = await Course.findByPk(req.params.id)
    if (course) {
        await course.destroy()
        res.status(204).end()
    } else {
        res.status(404).json({
            msg: 'Course Not Found'
        })
    }}))
module.exports = router;