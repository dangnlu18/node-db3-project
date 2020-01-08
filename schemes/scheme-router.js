const express = require('express');
const db = require('../db')

const Schemes = require('./scheme-model');

const router = express.Router({
  mergeParams: true
});

router.get('/', async(req,res,next)=>{
  try{
    const schemes = await Schemes.find()
    res.json(schemes)
  }
  catch(err){
    next(err)
  }
})

router.get('/:id', async(req,res,next)=>{
  try{
    const { id } = req.params
    res.json(await Schemes.findById(id))
  }
  catch(err){
    next(err)
  }
})

router.get('/:id/steps', async(req,res,next)=>{
  try{
    const { id } = req.params
    res.json(await Schemes.findSteps(id))
  }
  catch(err){
    next(err)
  }
})

router.post('/', async(req,res,next)=>{
  try{
    const payload = req.body
    await Schemes.add(payload)
    res.json({message:"successfully added"})
  }
  catch(err){
    next(err)
  }
})

//STETCH

// router.post('/:id/steps', async(req,res,next)=>{
//   try{
//     const payload = req.body
//     await Schemes.update(payload, req.params.id)
//     res.json({message:"successfully updated"})
//   }
//   catch(err){
//     next(err)
//   }
// })

router.put('/:id', async(req,res,next)=>{
  try{
    const payload = req.body
    await Schemes.update(payload, req.params.id)
    res.json({message:"successfully updated"})
  }
  catch(err){
    next(err)
  }
})

router.post('/:id/steps', (req, res) => {
  const stepData = req.body;
  const { id } = req.params; 

  Schemes.findById(id)
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

router.delete(':/id', async(req,res,next)=>{
  try{
    await Schemes.remove(req.params.id)
    res.json({message:"successfully deleted record"})
  }
  catch(err){
    next(err)
  }
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Schemes.remove(id)
  .then(deleted => {
    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: 'Could not find scheme with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete scheme' });
  });
});

module.exports = router;