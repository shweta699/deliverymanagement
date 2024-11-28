const express = require('express');
const { addVehicle, getVehicles } = require('../controllers/vehicleController');
const router = express.Router();

router.post('/add', addVehicle);
router.get('/', getVehicles);

module.exports = router;
