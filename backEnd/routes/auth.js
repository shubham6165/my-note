const express = require('express');
const User = require("../models/User");
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs'); // to convert password into a Hash String
const jwt = require('jsonwebtoken'); //for secure client server authentication
var fetchUser = require('../middleware/fetchUser');
require('dotenv').config();



const JWT_SECRET = process.env.JWT_SECRET;

// Route 1: Create a User using: POST "/api/auth/". doesn't require Auth

router.post('/signup', [
  body('email', 'Enter a valid email').isEmail(),
  body('password').isLength({ min: 5 }),
  body('name', 'Name cannot be Empty.').exists(),

], async (req, res) => {
  //const user = User(req.body);
  // user.save();
  const errors = validationResult(req);
  let success = false;
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() });
  }

  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({success, error: "Email already Registered, Try Login." })
    }

    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password, salt);
    // var token = jwt.sign({ email: req.body.email }, 'shhhhh');
    //create a new user
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPassword
    })
    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({success, authToken: authToken });
  }
  catch (error) {
    console.error(error.message);
    res.status(500).json({ message: err.message, error: "Some error occured" })
  };
})

//Route 2:  Login a User using: POST "/api/auth/". Require Auth
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password').exists()
],
  async (req, res) => {
    //const user = User(req.body);
    // user.save();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      let success = false;
      if (!user) {
        return res.status(400).json({success, error: "Wrong credentials, Try again with correct email and Password" });
      }

      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) {
        return res.status(400).json({success, error: "Wrong credentials, Try again with correct email and Password" });
      }
      const data = {
        user: {
          id: user.id
        }
      }
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      const json = res.json({success: success, authToken: authToken});
    }
    catch (error) {
      console.error(error.message);
      res.status(500).json({ message: err.message, error: "Internal Server error" })
    };

  })

//Route 3: Get loggedin User details using POST "/api/auth/getuser". Require Auth

router.get('/getuser', fetchUser,
  async (req, res) => {
    try {
      userid = req.user.id;
      const user = await User.findById(userid).select("-password"); //exclude password
      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: error.message, error: "Internal Server error" })
    };
  });

  // Route 4: Delete Registered User Account from db

  router.get('/deleteaccount', fetchUser,
  async (req, res) => {
    try {
      userid = req.user.id;
      await Note.deleteMany({ user: userid });
      const user = await User.findByIdAndDelete(userid);
      res.json({"Success": " Your Account has been deleted permanently", email: user.email});
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: error.message, error: "Internal Server error" })
    };
  });
  

module.exports = router;


