const express = require("express")
const User = require("../model/Discorduser")
const router = express.Router()


router.get("/:id",async(req,res)=>{
    //console.log("Hi")
    console.log(req.params.id)
    try {
        const loggedInUserId = req.params.id;

        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } })
        
        res.status(200).json(filteredUsers);
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports = router