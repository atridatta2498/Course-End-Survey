const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Verify the controller function exists
console.log('Auth Controller:', authController);

router.post('/login', authController.login);
router.post('/questions', authController.addQuestion);

// Update the admin login route path
router.post('/admin/login', authController.adminLogin);  // Changed from '/admin-login' to '/admin/login'

router.get('/questions', authController.getQuestions);
router.post('/submitAnswers', authController.submitAnswers);
router.get('/check-submission', authController.checkSubmission);
router.get('/admin/results', authController.getResults);
router.get('/subjects', authController.getSubjects);

// Make sure this matches your frontend request URL
router.post('/admin-login', authController.adminLogin);  // Note the hyphen in 'admin-login'

module.exports = router;  // Make sure to export the router