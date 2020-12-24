const express = require('express')
const pnw = express.Router()
const PNW = require('../models/pnw.js')

// ============Index Route==================
pnw.get('/', (req, res) => {
  PNW.find({}, (error, allLocations) => {
    res.render('pnw/index.ejs', {
      locations: allLocations
    })
  })
})

// ============New Route==================
pnw.get('/new', (req, res) => {
  res.render('pnw/new.ejs')
})

// ============Show Route==================
pnw.get('/:index', (req, res) => {
  PNW.findById (req.params.index, (err, foundLocation) => {
    res.render('pnw/show.ejs',
    {
        location: foundLocation
    });
  });
});
// ============Edit Route==================
pnw.get('/:index/edit', (req, res) => {
  PNW.findById(req.params.index, (err, allLocation) => {
    res.render(
      'pnw/edit.ejs',
      {
        location: allLocation
      });
  });
});
// ============Edit Put Route==================
pnw.put('/:index', (req, res) => {
  PNW.findByIdAndUpdate(req.params.index, req.body, {new:true}, (error, updatedModel) => {
    res.redirect('/tryon-experiences/' + req.params.index)

  })
})


// //==============Delete===========
pnw.delete('/:index', (req, res) => {
  PNW.findByIdAndRemove(req.params.index, (error, data) => {
  });
  res.redirect('/tryon-experiences');
});

// ============Seed Data==================
pnw.get('/setup/seed', (req, res) => {
  PNW.create (
    [{
      name: 'Baker Lake',
      img: 'https://lh3.googleusercontent.com/UTU0257wr97HE8dQnbsXGchNoG8PGOVLd_5ORn04uWgWpYiJ2MX5tQge0EUt-YNtz8h6ZkUAwN1RI8U7TlOnL37JSZvTrX_bSg6ubsUmUOfFMx4la4mrhQPtjeEMsIfcDh5ltn8Nc1M=w2400',
      description:'Located in the northern Cascades'
    },
  ],
  (error, data) => {
    res.redirect('/tryon-experiences')
  }
  )
});












// ============Module==================
module.exports = pnw
