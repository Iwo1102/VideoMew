const express = require('express');
const router = express.Router();
require('dotenv').config()
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const jwtString = process.env.JWT_STRING

const mongoose = require('mongoose')
mongoose.set('strictQuery', false);
const Schema = mongoose.Schema

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/VidMew', {
}).then(() => {
	console.log('Connected to MongoDB');
}).catch((error) => {
	console.error('MongoDB connection error:', error);
});

// Create a simple schema and model 
const UserSchema = new mongoose.Schema({
	id: Number,
	userName: String,
	email: String,
  pass: String,
  reviews: [{gameId: Number, rating: Number}],
  admin: Boolean
});
const GameSchema = new mongoose.Schema({
	id: Number,
	title: String,
  developer: String,
  releaseDate: String,
	image: String,
  rating: [{UserId: Number, rating: Number}],
  avgRating: Number

});

const User = mongoose.model('Users', UserSchema);
const Game = mongoose.model('Games', GameSchema);

router.post('/signin', async (req, res, next) => {
    let checkPass = false
    let theUser = {}
    try {
      let user = await User.find({userName: {$eq: req.body.userName.trim()}})
      if (user.length == 0) {
        theUser.userName = user[0].userName
        theUser.password = user[0].pass
        theUser.userEmail = user[0].email
        theUser.id = user[0].id
        theUser.admin = user[0].admin
      }
    
      checkPass = await bcrypt.compare(req.body.pass.trim(), user[0].pass)
    } catch (error) {
      res.status(500).json({ error: error.message });
          console.log(error.message);
    }
    if (!checkPass) {
      res.send({ success: false, message: "Email or password incorrect" })
      return
    }
    req.session.isLoggedIn = true
    req.session.theLoggedInUser = theUser.userName
    if (theUser.admin == true) {
      req.session.isAdmin = true
      res.send({ success: true, message: "Welcome, Admin" })
    } else {
      req.session.isAdmin = false
      res.send({ success: true, message: "Welcome" })
    }
  })
  
  router.post('/signup', async (req, res, next) => {
    try {
      let pass = req.body.pass.trim();
      let email = req.body.email.trim();
      let userName = req.body.userName.trim();
      let userId = 0;
      let usersEmail = await User.find({email: {$eq: email}})
      let usersName = await User.find({userName: {$eq: userName}})
      if (usersEmail.length == 0) {
        if (usersName.length == 0) {
          let flag = 0;
          while (flag == 0) {
            let checkID = await User.find({id: {$eq: userId}});
            if (checkID.length == 0) {
              let hashpass = bcrypt.hashSync(pass, 10);
              await User.create({userName: userName, email: req.body.email.trim(), pass: hashpass, id: userId, reviews: [], admin: false})
              flag = 1;
            }
            console.log("ID: " + userId)
            userId++;
          }
            res.send({ success: true, message: "Signup successfull" })
        } else {
          res.send({ success: false, message: "User Name aready exists" })
        }
      } else {
        res.send({ success: false, message: "Email aready used" })
      }
  
   } catch (error) {
      res.status(500).json({ error: error.message });
          console.log(error.message);
    }
  })
  
  router.get('/signout', (req, res, next) => {
    req.session.isLoggedIn = false
    let loggedIn = req.session.isLoggedIn
    req.session.isAdmin = false
    res.send('done: ' + loggedIn)
  })
  

  exports.routes = router
