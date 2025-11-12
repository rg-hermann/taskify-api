const express = require('express');
const Joi = require('joi');
const Task = require('../models/task');

const router = express.Router();

const taskSchema = Joi.object({
  title: Joi.string().min(1).max(200).required(),
  description: Joi.string().allow('', null),
  completed: Joi.boolean(),
  dueDate: Joi.date().optional(),
});

// List tasks
router.get('/', async (req, res, next) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});

// Get single
router.get('/:id', async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Not found' });
    res.json(task);
  } catch (err) {
    next(err);
  }
});

// Create
router.post('/', async (req, res, next) => {
  try {
    const { error, value } = taskSchema.validate(req.body, { stripUnknown: true });
    if (error) return res.status(400).json({ message: error.message });
    const created = await Task.create(value);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

// Update
router.put('/:id', async (req, res, next) => {
  try {
    const { error, value } = taskSchema.validate(req.body, { stripUnknown: true });
    if (error) return res.status(400).json({ message: error.message });
    const updated = await Task.update(req.params.id, value);
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// Delete
router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await Task.delete(req.params.id);
    if (deleted.changes === 0) return res.status(404).json({ message: 'Not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
