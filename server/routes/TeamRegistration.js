const router = require('express').Router()
const Team =require('../model/Team')
const Tournament = require('../model/Tournament')

router.post("/", async (req,res)=>{
    console.log(req.body)
    try {
      const { T_id, name, members, emails , createdBy} = req.body;
  
      // Check if the team already exists by name
      const existingTeam = await Team.findOne({ name });
  
      if (existingTeam) {
        return res.status(200).json({ success: false, message: 'Team with the same name already exists' });
      }
  
      // Create a new team instance
      const newTeam = new Team({
        T_id: T_id,
        name: name,
        members: members,
        emails: emails,
        createdBy:createdBy
      });
  
      // Save the team to the database
      await newTeam.save();
  
      res.json({ success: true, message: 'Team registered successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  })




  router.get('/Allteams', async (req,res)=>{
    // const team = await Tournament.find()
    // res.status(200).json(team) 
    try {
      const team = await Tournament.aggregate([
        {
          $lookup:{
              from:"teams",
              localField:"id",
              foreignField:"T_id",
              as:"Team"
          }
        }
      ])
      res.status(200).json(team)
    } catch (error) {
      console.log(error)
    }


  })




  
  router.delete('/deleteteam/:itemId',async(req,res)=>{
    
    try {
      const teamId = req.params.itemId;
  
      // Check if the team with the given ID exists
      const team = await Team.findById(teamId);
  
      if (!team) {
        return res.status(404).json({ success: false, message: 'Team not found' });
      }
  
      // Remove the team from the database
      await team.deleteOne();
  
      res.json({ success: true, message: 'Team deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  
  })




module.exports = router;