const express = require('express');
const router = express.Router();

const Round = require('../models/Round');

// Create a new Round
router.post('/', async (req, res) => {
  try {
    const newRound = new Round(req.body);
    const savedRound = await newRound.save();
    res.status(201).json(savedRound); // Respond with the saved round
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all Routes
router.get('/', async (req, res) => {
  try {
    const round = await Round.find().populate('golfers course').populate('scorecard.golfer');
    res.json(round); // Respond with all rounds
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific Round by ID
router.get('/:id', async (req, res) => {
  try {
    const round = await Round.findById(req.params.id).populate('golfers course').populate('scorecard.golfer');
    if (!round) {
      return res.status(404).json({ error: 'Round not found' });
    }
    res.json(round); // Respond with the found round
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a specific Round by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedRound = await Round.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRound) {
      return res.status(404).json({ error: 'Round not found' });
    }
    res.json(updatedRound); // Respond with the updated round
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a specific Round by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedRound = await Round.findByIdAndDelete(req.params.id);
    if (!deletedRound) {
      return res.status(404).json({ error: 'Round not found' });
    }
    res.json({ message: 'Round deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;