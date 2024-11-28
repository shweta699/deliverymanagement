const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issueController');

// Routes
router.post('/add', issueController.addIssue); // Endpoint to add a new issue
router.get('/getRevenue', issueController.getRevenue); // Endpoint to fetch revenue data
router.post('/addRevenue', issueController.addRevenue); // Endpoint to add revenue data




module.exports = router;
