const router = require('express').Router();
const imagemodel = require('../model/Image')



router.post('/upload',async(req,res)=>{
    //console.log(req.body)
    const image = new imagemodel({
      image: req.body.post,
      name:req.body.name,
      react:req.body.react
    })
    await image.save()
  
    res.send({message: "Image Upload Successfully!"})
  })
  



router.get('/Allpost',async(req,res)=>{
      const data = await imagemodel.find({}).sort({ react: -1})
      res.json(data)
  })

router.post('/react',async(req,res)=>{
    //console.log(req.body)
    try {
      const filter = {
        _id:req.body.Id
      }
  
      const update={
        $set:{
          react:req.body.React
        }
      }
       await imagemodel.updateOne(filter,update) 
    } catch (error) {
      
    }
  })


router.delete('/delete/:id',async(req,res)=>{
  
  try {
    //console.log(req.params.id)  
    
    const picture = await imagemodel.findById(req.params.id);

    if(!picture){
      return res.status(400).json({success:false,message:'Picture not found'})
    }

    await picture.deleteOne();
    res.json({ success:true, message:"Picture deleted successfully"})
  } catch (error) {
    res.status(500).json({success:false, error:error.message})
  }
})  


module.exports = router