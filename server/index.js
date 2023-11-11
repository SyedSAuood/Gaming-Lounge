require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const discordauth = require('./Authentication/discordauth')


const cors = require('cors');


const authroute = require('./routes/auth')
const dashboardroute = require('./routes/dashboardauth')
const PORT = process.env.PORT || 5000

mongoose.connect('mongodb://127.0.0.1:27017/discordauth', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('Mongoose connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});



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

app.use(cors({
  origin: 'http://localhost:5000' 
}));

// app.all('/', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next();
//  });


app.get("/api/v1", (req, res) => {
  res.send("Daddy from Work");
});



app.use("/auth",authroute)

app.use("/Home",dashboardroute)

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//   // Add other CORS headers as needed
  
//   next();
//  });




app.listen(PORT, () => console.log(`start listening on port : ${PORT}`));
