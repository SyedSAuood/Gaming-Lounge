const router = require('express').Router();
const Singleplayer = require('../model/Singleplayer')
const Tournament = require("../model/Tournament")

router.post("/", async (req,res)=>{
    console.log(req.body)
    try {
        const {T_id,player, email} =req.body

        const existingplayer = await Singleplayer.findOne({ player });

        if(existingplayer){
            return res.status(200).json({success: false,message: "Player already exists"})
        }

        const newRegistration = new Singleplayer({
            T_id:T_id,
            player:player,
            email:email
        })

        await newRegistration.save();
        res.status(201).json({ success: true, message: 'player registered successfully' })

    } catch (error) {
        res.status(500).json({success: false,error:error.message})
    }
})

router.get('/allregistration', async (req,res)=>{
    // const player = await Tournament.find();
    // res.status(200).json(player)
    try {
        const team = await Tournament.aggregate([
          {
            $lookup:{
                from:"singleplayers",
                localField:"id",
                foreignField:"T_id",
                as:"Registerd"
            }
          }
        ])
        res.status(200).json(team)
      } catch (error) {
        console.log(error)
      }
})

router.delete('/Deregister/:id',async(req,res)=>{
  try {
    const id =req.params.id
    const players = await Singleplayer.findById(id)

    if(!players){
      return res.status(400).json({success:false,message:'No Player found with the given ID.'})
    }

    await players.deleteOne();
    res.json({ success:true, message:"Team deleted successfully"})
  } catch (error) {
    res.status(500).json({success:false, error:error.message})
  }
})

module.exports = router