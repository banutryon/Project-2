const bcrypt = require('bcrypt')
const express = require('express')
const users = express.Router()
const User = require('../models/users.js')

users.get('/new', (req, res) => {
  res.render('sessions/new.ejs', {
    currentUser: req.session.currentuser
  })
})

users.post('/', (req, res) => {
  // overwrite the user password with the hashed password, then it passes into your data base.
  req.body.password = bcrypt.hashSync(req.body.password,
  bcrypt.genSaltSync(10))
  User.create(req.body, (error, createdUser) => {

    console.log('user is created', createdUser);
    res.redirect('/sessions/new')
  })
})

module.exports = users
