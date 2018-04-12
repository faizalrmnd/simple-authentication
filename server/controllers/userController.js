const jwt = require('jsonwebtoken');
const users = require('../models/users');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config()



module.exports = {
  signUp: function(req, res) {
    const saltRounds = 10;
    let pass = bcrypt.hashSync(req.body.password, saltRounds);

    let newUser = new users({
      email: req.body.email,
      password: pass
    })

    newUser.save((err, result) => {
      if(err) {
        console.log(err);
      } else {
        res.status(201).json({
          message: 'successfully added a new user !',
          data: result
        })
      }
    })
  },
  signIn: function(req, res) {
    users
      .findOne({ username: req.body.username})
      .then(user => {
        if(bcrypt.compareSync(req.body.password, user.password)){
          let token = jwt.sign({ id: user.id, role: user.username, name: user.name}, process.env.SECRET)
          // req.headers.token = token;
        }
        // res.json(req.headers.token)
        // res.json(user.id)
        // res.redirect(`/user/${user.id}`);
      })
  }
};
