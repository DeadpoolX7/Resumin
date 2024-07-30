const express = require('express');
const router = express.Router();
const { createResume, getResume, generatePDF } = require('../controllers/resumeController');
const authMiddleware = require('../middelware/authMiddleware');

router.post('/', authMiddleware, createResume);
router.get('/:id', authMiddleware, getResume);
router.get('/:id/pdf', authMiddleware, generatePDF);

module.exports = router;