var DiscordStrategy = require('passport-discord').Strategy;
const passport = require('passport');
const Discorduser = require('../model/Discorduser')
const axios = require('axios')

passport.serializeUser((user,done)=>{
    //console.log(user)
   // console.log("serializeuser")
    done(null,user.id);
})

passport.deserializeUser(async(id,done)=>{
    //console.log("deserializeuser")
   const user = await Discorduser.findById(id);
   if(user){
    done(null,user);
   }
})


passport.use(new DiscordStrategy({
    clientID: process.env.DISCORD_CLientID,
    clientSecret: process.env.DISCORD_SERECT,
    callbackURL: process.env.Client_redirect,
    scope: ['identify']
},async (accessToken, refreshToken, profile, done) => {

    
    try {
        const user = await Discorduser.findOne({ discordId:profile.id});
        if(user){
            console.log("user exist")
            //console.log(accessToken)
            // const { data:userResponse }  = await axios.get('https://discord.com/api/v10/users/@me',
            //  {
            //  headers:{
            //          Authorization: `Bearer ${accessToken}`,},
            //  }
            // )
            // console.log(userResponse);
            done(null,user)
        }else{
        
            console.log("User does not exist")
            const newUser = await Discorduser.create({
                discordId: profile.id,
                username: profile.username, 
                access_token:accessToken               
            })
            const saveduser = await newUser.save();
            done(null,saveduser);
        }
        
    } catch (error) {
        console.log(error)
        done(error,null);
    }
   
}));