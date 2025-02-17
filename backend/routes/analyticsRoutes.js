const express = require('express');
const router = express.Router();
const analyticsController = require('../Controllers/analyticsController');

router.get('/financial', analyticsController.getFinancialAnalytics);

module.exports = router;
