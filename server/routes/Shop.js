const router = require('express').Router()
const WTS = require('../model/WantToSell')
const WTB = require('../model/WantToBuy')

router.post("/",async(req,res)=>{
    try {
        const{Username,Userid,GameTitle, AccountLevel, Platform, InGameCurrency,RareItem,Description, Quantity,Price,Email,Password} = req.body
        console.log(req.body)

        const account = new WTS({
            username: Username,
            userid:Userid,
            gameTitle:GameTitle,
            accountLevel:AccountLevel,
            platform:Platform,
            inGameCurrency:InGameCurrency,
            rareItems:RareItem,
            description:Description,
            quantity:Quantity,
            price:Price,
            email:Email,
            password:Password,

        })  
        await account.save();
        res.status(201).json({success:true})

    } catch (error) {
        res.status(400).json({ success: false, error: error.message })
    }
})

router.get("/sellaccount",async(req,res)=>{
    try {
        const data = await WTS.find()
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json(error)
    }
})

router.post('/buy',async(req,res)=>{
    try {
        const{Username,Userid,GameTitle, AccountLevel, Platform, InGameCurrency,RareItem,Description, Quantity,Price} = req.body
        console.log(req.body)

        const account = new WTB({
            username: Username,
            userid:Userid,
            gameTitle:GameTitle,
            accountLevel:AccountLevel,
            platform:Platform,
            inGameCurrency:InGameCurrency,
            rareItems:RareItem,
            description:Description,
            quantity:Quantity,
            price:Price
        })  
        await account.save();
        res.status(201).json({success:true})

    } catch (error) {
        res.status(400).json({ success: false, error: error.message })
    }
})

router.get("/buyaccount",async(req,res)=>{
    try {
        const data = await WTB.find()
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json(error)
    }
})

router.delete("/delete/:id",async(req,res)=>{
    try {
        const id = req.params.id
        const account = await WTB.findById(id);

        await account.deleteOne();
        res.json({ success: true, message: 'Account deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });

    }
})

router.delete("/sellaccount/delete/:id",async(req,res)=>{
    try {
        const id = req.params.id
        const account = await WTS.findById(id);

        await account.deleteOne();
        res.json({ success: true, message: 'Account deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });

    }
})

router.put('/sell/approve/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const doc = await WTS.findByIdAndUpdate(id, { approved: true }, { new: true });
        if (!doc) {
            return res.status(404).json({ success: false, message: 'Data not found' });
        }
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Admin approval endpoint for buy
router.put('/buy/approve/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const doc = await WTB.findByIdAndUpdate(id, { approved: true }, { new: true });
        if (!doc) {
            return res.status(404).json({ success: false, message: 'Data not found' });
        }
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.get("/getsellorder/:id",async(req,res)=>{
    console.log(req.params.id)
    try {
        const account = await WTS.findById(req.params.id);
        //const account = await WTS.findById(id);
        res.status(200).json(account)
    } catch (error) {
        res.status(400).json(error)
    }
})

router.get("/getbuyorder/:id",async(req,res)=>{
    console.log(req.params.id)
    try {
        const account = await WTB.findById(req.params.id);
        //const account = await WTS.findById(id);
        res.status(200).json(account)
    } catch (error) {
        res.status(400).json(error)
    }
})


module.exports = router