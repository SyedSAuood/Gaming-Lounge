require('dotenv').config();
const express = require('express');
//const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const discordauth = require('./Authentication/discordauth')
// All the routes
const connectToMongoDB = require("./db/connectToMongodb")
const authroute = require('./routes/auth')
const dashboardroute = require('./routes/dashboardauth')
const TeamRoute = require('./routes/TeamRegistration')
const SingleRoute = require('./routes/SingleRegistration')
const TournamentRoute = require('./routes/TournamentRoute')
const PictureRoute =require('./routes/PictureRoute')
const Shop = require('./routes/Shop')
const MessageRoute = require("./routes/messages")
const UserRoute = require("./routes/User")
const RankingRoute = require("./routes/ranking")

const {app ,server} = require("./socket/socket")

const PORT = process.env.PORT || 5000

app.use(session({
  secret:'somethink',
  cookie:{
    maxAge: 60000 * 60 * 24
  },
  saveUninitialized:false,
  resave: false,
  name:'discord.auth2'
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(express.json({limit : "10mb"}))


app.use("/auth",authroute)
app.use("/Home",dashboardroute)

app.use('/team',TeamRoute)
app.use('/singleregistration',SingleRoute)
app.use('/tournament',TournamentRoute)
app.use('/pic',PictureRoute)
app.use('/shop',Shop)

app.use('/message',MessageRoute)
app.use('/user',UserRoute)

app.use('/ranking',RankingRoute)



const url = 'http://localhost:3000/'
app.get('/logout', (req, res) => {
  // Clear the 'auth' cookie to log out the user
  res.clearCookie('discord.auth2');
  req.session.user = null;
  
  res.redirect(url);
});


server.listen(PORT, () => {
  connectToMongoDB()
  console.log(`start listening on port : ${PORT}`)});
  
  

    // app.use(cors({
    //   origin: 'http://localhost:5000' 
    // }));
    
    // app.all('/', function(req, res, next) {
    //   res.header("Access-Control-Allow-Origin", "*");
    //   res.header("Access-Control-Allow-Headers", "X-Requested-With");
    //   next();
    //  });

  // mongoose.connect('mongodb://127.0.0.1:27017/Gaming', {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // });
  
  // const db = mongoose.connection;
  
  // db.on('error', (error) => {
  //   console.error('Mongoose connection error:', error);
  // });
  
  // db.once('open', () => {
  //   console.log('Connected to MongoDB');
  // });
