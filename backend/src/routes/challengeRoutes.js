const express = require('express');
const router = express.Router();
const challengeController = require('../controllers/challengeController');

// GET /api/challenges
router.get('/', challengeController.getChallenges);

// GET /api/challenges/:slug
router.get('/:slug', challengeController.getChallengeBySlug);

module.exports = router;