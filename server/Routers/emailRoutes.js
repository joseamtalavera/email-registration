// routes/emailRoutes.js
const express = require('express');
const emailController = require('../Controllers/emailController');
const router = express.Router();

router.post('/register', emailController.registerEmail);
router.get('/emails', emailController.getEmails);

module.exports = router;