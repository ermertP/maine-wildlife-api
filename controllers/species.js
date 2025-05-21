
const express = require('express');
const router = express.Router();
const Species = require('../models/species');  



router.get('/', async (req, res) => {
  try {
    const species = await Species.findAll();

    res.json(species);
  } catch (error) {
    console.error('Error fetching species data:', error);
    res.status(500).json({ message: 'Error fetching species data' });
  }
});


router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const speciesToFind = await Species.findByPk(id);  
    if (speciesToFind) {
      res.json(speciesToFind);
    } else {
      res.status(404).json({ message: 'Species not found' });
    }
  } catch (error) {
    console.error('Error fetching species by ID:', error);
    res.status(500).json({ message: 'Error fetching species data' });
  }
});


router.post('/', async (req, res) => {
  try {
    if (!Array.isArray(req.body) || req.body.length === 0) {
      return res.status(400).json({ message: 'Request body must be a non-empty array of species.' });
    }


    const newSpecies = await Species.bulkCreate(req.body);
    console.log('post confirmed')
    res.status(201).json(newSpecies);
  } catch (error) {
    console.error('Error creating species:', error);
    res.status(500).json({ message: 'Error creating species', error });
  }
});



router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, scientific_name, description, image_url, locations } = req.body;

  try {
    const speciesToUpdate = await Species.findByPk(id);

    if (!speciesToUpdate) {
      return res.status(404).json({ message: 'Species not found' });
    }

    speciesToUpdate.name = name || speciesToUpdate.name;
    speciesToUpdate.scientific_name = scientific_name || speciesToUpdate.scientific_name;
    speciesToUpdate.description = description || speciesToUpdate.description;
    speciesToUpdate.image_url = image_url || speciesToUpdate.image_url;
    speciesToUpdate.locations = locations || speciesToUpdate.locations;

    await speciesToUpdate.save();

    res.json(speciesToUpdate);
  } catch (error) {
    console.error('Error updating species:', error);
    res.status(500).json({ message: 'Error updating species' });
  }
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const speciesToDelete = await Species.findByPk(id);
    if (!speciesToDelete) {
      return res.status(404).json({ message: 'Species not found' });
    }

    await speciesToDelete.destroy();

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting species:', error);
    res.status(500).json({ message: 'Error deleting species' });
  }
});

module.exports = router;
