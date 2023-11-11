const router = require('express').Router();

function isAuthorized(req,res,next){
    if(!req.user){
        //console.log("User is logged in");
        //res.redirect('/game')
        //console.log(req.user);
        res.redirect('/auth/redirect')
    }else{
        //console.log(req.query)
       // console.log("user is not logged in");
        //res.redirect('/login')
        next();
    }
}


router.get('/', isAuthorized, (req,res) => {
    //console.log(req.user)
    //console.log(req.query)
    //res.send('Hey i am '+req.user.username)
    res.json(req.user)  
})


module.exports = router;