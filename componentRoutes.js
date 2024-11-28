const express = require('express');
const { addComponent, getComponents } = require('../controllers/componentController');
const router = express.Router();

router.post('/add', addComponent);
router.get('/', getComponents);

module.exports = router;
