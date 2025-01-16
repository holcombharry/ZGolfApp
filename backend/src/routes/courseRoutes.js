const express = require('express');
const Course = require('../models/Course'); // Import the Course model
const router = express.Router();

// CREATE a new course
router.post('/', async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course); // Respond with the created course
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// READ all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses); // Respond with a list of all courses
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ a single course by ID
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json(course); // Respond with the found course
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE a course by ID
router.put('/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json(course); // Respond with the updated course
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a course by ID
router.delete('/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json({ message: 'Course deleted' }); // Respond with a deletion message
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
