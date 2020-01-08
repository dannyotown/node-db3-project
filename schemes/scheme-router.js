const express = require('express');

const Schemes = require('./scheme-model.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try{
    res.json(await Schemes.find())
  }catch(err){
    console.log(err)
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try{
    res.json(await Schemes.findBy(id))
  }catch(err){
    console.log(err)
  }
});

router.get('/:id/steps', async (req, res) => {
  const { id } = req.params;
  try{
    res.json(await Schemes.findSteps(id))
  }catch(err){
    console.log(err)
  }
});

router.post('/', async (req, res) => {
  const schemeData = req.body;

  try{
    const [id] = await Schemes.add(schemeData)
    res.json(await Schemes.findBy(id))
  }catch(err){
    console.log(err)
  }
});

router.post('/:id/steps', (req, res) => {
  const stepData = req.body;
  const { id } = req.params; 

  Schemes.findBy(id)
  .then(scheme => {
    if (scheme) {
      Schemes.addStep(stepData, id)
      .then(step => {
        res.status(201).json(step);
      })
    } else {
      res.status(404).json({ message: 'Could not find scheme with given id.' })
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new step' });
  });
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  try{
    await Schemes.update(id,changes)
    res.status(201).json({Success:'Scheme deleted Successfully!'})
  }catch(err){
    console.log(err)
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try{
    res.json(await Schemes.remove(id))
  }catch(err){
    console.log(err)
  }
});

module.exports = router;