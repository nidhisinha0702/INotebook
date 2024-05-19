const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken')
var fetchuser = require('../middleware/fetchuser')
const JWT_SECRET = 'Harryisagoodb$oy';

//ROUTE-1 Create a User using : POST "/api/auth/createuser".No login required Doesn't require Auth
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 character").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    //If there are errors , return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //Check whether the user with this email exist already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with email already exist" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password,salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user:{
          id: user.id
        }
      }
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json(authToken);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
    //.then(user => res.json(user))
    //.catch(error=>{
    //  console.log(error)
    //res.json({error: 'Please enter a unique value for email', message: error.message})})
  }
);

//ROUTE-2 Authenticate a user
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password","Password cannot be blank").exists()
  ],async(req,res)=>{

    //if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
          return res.status(400).json({error: "Please try to login with correct credential"});
        }
        const passwordCompare = bcrypt.compare(password,user.password);
        if(!passwordCompare){
          return res.status(400).json({error: "Please try to login with correct credential"});
        }
        const data = {
          user:{
            id: user.id
          }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json(authToken);
    }catch(error){
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
)
//ROUTE-3: Get loggedin User Detail using: POST "/api/auth/getuser". login required

router.post(
  "/getuser", fetchuser, async(req,res)=>{

try{
  userId = req.user.id;
  const user = await User.findById(userId).select("-password");
  res.send(user);
}catch(error){
  console.error(error.message);
  res.status(500).send("Internal Server Error")
}
}
)

module.exports = router;
