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
mongoose.connect('mongodb://localhost:27123/VidMew', {
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
  releaseDate: Date,
	image: String,
  genre: [String],
  reviews: [{userId: Number, rating: Number, comment: String}],
  avgRating: Number

});

const User = mongoose.model('Users', UserSchema);
const Game = mongoose.model('Games', GameSchema);

router.post('/signin', async (req, res) => {
    let checkPass = false
    let theUser = {}
    try {
      let user = await User.findOne({userName: {$eq: req.body.userName.trim()}})
      if (user) {
        theUser.userName = user.userName
        theUser.password = user.pass
        theUser.userEmail = user.email
        theUser.id = user.id
        theUser.admin = user.admin

        checkPass = await bcrypt.compare(req.body.pass.trim(), user.pass)
      } else {
        res.json({ success: false,  message: "User not found ", error: 2 });
        return;
      }
    
    } catch (error) {
      res.status(500).json({ error: error.message });
          console.log(error.message);
    }
    if (!checkPass) {
      res.json({ success: false, message: "Email or password incorrect", error: 1 })
      return
    }
    req.session.isLoggedIn = true
    req.session.theLoggedInUser = theUser.userName
    if (theUser.admin == true) {
      req.session.isAdmin = true
      res.json({ success: true, message: "Welcome, Admin", error: 0 })
    } else {
      req.session.isAdmin = false
      res.json({ success: true, message: "Welcome", error: 0 })
    }
  })
  
  router.post('/signup', async (req, res) => {
    console.log("signup")
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
              console.log("create user")
              await User.create({userName: userName, email: req.body.email.trim(), pass: hashpass, id: userId, reviews: [], admin: false})
              flag = 1;
            }
            userId++;
          }
            req.session.isLoggedIn = true
            req.session.theLoggedInUser = userName
            console.log("Signup successfull")
            res.json({ success: true, message: "Signup successfull", error: 0 })
        } else {
          console.log("User Name aready exists")
          res.json({ success: false, message: "User Name aready exists", error: 1 })
        }
      } else {
        console.log("Email aready used")
        res.json({ success: false, message: "Email aready used", error: 2 })
      }
  
   } catch (error) {
      res.status(500).json({ error: error.message });
      console.log("error:" + error.message);
    }
  })
  
  router.get('/signout', (req, res) => {
    req.session.isLoggedIn = false
    let loggedIn = req.session.isLoggedIn
    req.session.isAdmin = false
    res.json({ success: true, message: "Signed out", error: 0 })
  })

  router.get('/getAllGames', async (req, res) => {
    try {
        const games = await Game.find().populate('reviews'); // Assuming reviews are a subdocument or referenced document
        res.json(games);
    } catch (error) {
        console.error("Error fetching games:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/searchGames', async (req, res) => {
  try {
      const query = req.query.q; // Assume "q" is the query parameter
      const games = await Game.find({ title: { $regex: query, $options: 'i' }}).populate('reviews');
      res.json(games);
  } catch (error) {
      console.error("Error searching games:", error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});
  
  router.post('/reviewAdd', async (req, res) => {
    console.log("session: " + req.session.theLoggedInUser + "Request: " + req.body.userName)
    if (req.session.theLoggedInUser == req.body.userName) {
      try {
        let userCaller = req.body.userName
        let gameTitle = req.body.title
        let gameRating = req.body.rating
        let gameComment = req.body.comment


        let user = await User.findOne({userName: userCaller});
        if (user) {
          let game = await Game.findOne({title: gameTitle});
          let errFlag = 0;
          if (game) {
            for (let i = 0; i < game.reviews.length; i++) {
              if (game.reviews[i].userId == user.id) {
                errFlag = true;
              } 
            }
            console.log("review count " + game.reviews.length)
            if (errFlag) {
              res.send({ success: false, message: "User already reviewed this game ", error: 4 })
            } else {
              // reviews: [{UserId: Number, rating: Number, comment: String}]
              let avg = 0;
              for (let i = 0; i < game.reviews.length; i++) {
                avg += game.reviews[i].rating;
              }
              avg += gameRating
              avg = avg / (game.reviews.length + 1)
              //console.log({message: "game reviews", game.})
              await Game.findOneAndUpdate({title: {$eq: gameTitle}}, {$push: {reviews: {userId: user.id, rating: gameRating, comment: gameComment}}, avgRating: avg});
              // reviews: [{gameId: Number, rating: Number}]
              await User.findOneAndUpdate({userName: {$eq: userCaller}}, {$push: {reviews: {gameId: game.id, rating: gameRating}}});
              res.send({ success: true, message: "Review Added ", error: 0 })
            }
          } else {
            res.json({ success: false, message: "Game not found ", error: 3 })
          }
        } else {
          res.json({ success: false, message: "User not found ", error: 2 })
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error.message);
      }
    } else {
      res.json({ success: false, message: "Not logged in ", error: 1 })

    }
  })

  exports.routes = router
