const router = require('express').Router();
const passport = require('passport');

const url = 'http://localhost:3000/Home'
// router.get('/redirect',(req,res)=>{
//     res.status(200).send("hello");
// })

// router.get('/redirect',passport.authenticate('discord',{
//     failureRedirect:'/forbidden',
//    // successRedirect:'http://localhost:3000/Home'
// }),(req,res)=>{
//     //console.log(res)
//     res.send(JSON.stringify(req.user))
// })

router.get('/redirect',
  passport.authenticate('discord')
)
router.get('/redirect/callback',
    passport.authenticate('discord', {
        failureRedirect: '/',
    }),
    (req, res) => {
        // Successful authentication
        //  console.log(req.query);
        //  console.log(req.user)
         //res.status(200).json(req.user);
        // console.log(req.user.access_token);
         req.session.user = req.user;
         res.redirect(url); // Redirect to a dashboard or home page

    });

    router.get('/api/user', (req, res) => {
        if (req.session.user) {
          // If the user is authenticated and their data is in the session, send their data
          res.status(200).json(req.session.user);
        } else {
          // If the user is not authenticated or their data is not available, send an error or an empty object
          res.status(401).json({ error: 'Unauthorized' });
        }
      });


module.exports = router;