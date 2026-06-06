const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');

// GET /api/lessons
router.get('/', lessonController.getLessons);

// GET /api/lessons/:slug
router.get('/:slug', lessonController.getLessonBySlug);

module.exports = router;