const router = require('express').Router();
const playerdata = require("../Player_Data/playerdata.json");
const Winner = require("../model/Winner");

router.get("/", async (req, res) => {
    try {
        const sortedData = playerdata.sort((a, b) => b.ExperiencePoints - a.ExperiencePoints);
        res.status(200).json(sortedData);
    } catch (error) {
        res.status(400).json(error);
    }
});


router.post("/winners",async(req,res)=>{
  const winnersArray = req.body.winners;
  try {
        for (const winner of winnersArray) {
          const { name, gamename } = winner;
          const winnerExists = await Winner.exists({ name, gamename });
          
        
          if (!winnerExists) {
            // Create a new winner document
            const newWinner = new Winner({ name, gamename });
            
            // Save the new winner to the database
            await newWinner.save();
          } else {
            console.log(`Winner ${name} from game ${gamename} already exists.`);
          }
        }
    
        // Send success response
        res.status(201).json({ message: 'Winners added successfully' });
      } catch (error) {
        console.error('Error handling winners:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    })

router.get("/getwinners",async(req,res)=>{
    try {
        const data = await Winner.find()
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json(error);
    }
})



module.exports = router;