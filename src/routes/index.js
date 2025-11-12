const express = require('express');
const tasks = require('./tasks');

const router = express.Router();

router.use('/tasks', tasks);

router.get('/', (req, res) => res.json({ ok: true, version: '1.0.0' }));

module.exports = router;
