const router = require('express').Router()
const Tournament =require('../model/Tournament')
const Team = require('../model/Team')
const Singleplayer=require('../model/Singleplayer')

router.get('/',async (req,res)=>{
    const tournament = await Tournament.find()
    res.status(200).json(tournament)
    
})

router.get('/getteams/:id',async (req,res)=>{
    console.log(req.params.id)
    try {
        const id = req.params.id

        const team = await Team.find({T_id:id});

        res.status(200).json(team)
     
    } catch (error) {
        res.status(400)
    }

})

router.get('/getplayer/:id',async(req,res)=>{
    console.log(req.params.id)
    try {
        const id = req.params.id;
        const player = await Singleplayer.find({T_id:id});
        res.status(200).json(player)
    } catch (error) {
        res.status(400)
    }

})

router.delete(`/delete/:id`,async(req,res)=>{
    try {
        const id = req.params.id
        const tournament = await Tournament.findById(id);

        await tournament.deleteOne();
        res.json({ success: true, message: 'Tournament deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });

    }
})

router.post('/addtournament',async(req,res)=>{
    console.log(req.body)
    try {
        const {tournament_name,
            game_name,
            start_date,
            end_date,
            organizer_name,
            registration_deadline,
            format} = req.body
           

        const newtournament = new Tournament({
            
            name:tournament_name,
            gameName :game_name,
            startDate :start_date,
            endDate :end_date ,
            organizer :organizer_name,
            registrationDeadline:registration_deadline,
            format:format
        })     

    await newtournament.save()
        res.json({ success:true, message:"Tournament Added"})
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
})

module.exports = router