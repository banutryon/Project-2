const express = require('express')
const pnw = express.Router()
const PNW = require('../models/pnw.js')

const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next()
  } else {
    res.redirect('/sessions/new')
  }
}



// ============Index Route==================
pnw.get('/', (req, res) => {
  PNW.find({}, (error, allLocations) => {
    res.render('pnw/index.ejs', {
      locations: allLocations,
      currentUser: req.session.currentUser
    })
  })
})
// ============Home Route==================
pnw.get('/home', (req, res) => {
    res.render('pnw/gallery.ejs', {
      currentUser: req.session.currentUser
    })
})
// ============New Route==================
pnw.get('/new', isAuthenticated, (req, res) => {
  res.render(
    'pnw/new.ejs',
    {currentUser: req.session.currentUser}
  )
})
// ============POST New Route==================
pnw.post('/', (req, res) => {
  PNW.create(req.body, (error, createdLocation) => {
    res.redirect('/tryon-experiences')
  })
})


// ============Show Route==================
pnw.get('/:index', (req, res) => {
  PNW.findById (req.params.index, (err, foundLocation) => {
    res.render('pnw/show.ejs',  {
        location: foundLocation,
        currentUser: req.session.currentUser
    });
  });
});
// ============Edit Route==================
pnw.get('/:index/edit',isAuthenticated, (req, res) => {
  PNW.findById(req.params.index, (err, allLocation) => {
    res.render(
      'pnw/edit.ejs',
      {
        location: allLocation,
        currentUser: req.session.currentUser
      });
  });
});
// ============Edit Put Route==================
pnw.put('/:index', (req, res) => {
  PNW.findByIdAndUpdate(
    req.params.index,
    req.body,
    {new:true},
    (error, updatedModel) => {
    res.redirect('/tryon-experiences/' + req.params.index)

    }
  )
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
      mapImg: 'https://lh3.googleusercontent.com/tj93SgzvXP8262966q9miqmKoq-srJRdJ8XJ93Snes1HGfqftskwsW2-x1GLzJVh8ds8jZNBus5T-1yiIdF64OYU9FtTk1dXSzoSNmLL81BsI_a34D1bJszY46H5ABXLXXBTEXKF_U4=w2400',
      map: "https://goo.gl/maps/LdG3kBFTmVpqutcz6",
      description:'is a lake in northern Washington state in the United States. The lake is situated in the Mount Baker-Snoqualmie National Forest and Baker River valley southwest of North Cascades National Park and is fed by the Baker River along with numerous smaller tributaries. The lake is approximately 10 miles (16 km) north of the town of Concrete, Washington.'
    },
    {
      name: 'Blanca Lake',
      img: 'https://lh3.googleusercontent.com/jNMYezRKx17P2CwGcv2lr_K1tq0zwUu8CE6YCRD6Ftgu3jHpHyBOdfrvIuFbdyZB0sXoFImbFL9bhKKVW3OFNfHYni_rKIqE518Yl0yDY8nOu_mifzb7egzerNfUN2x8SzacKwLI4mE=w2400',
      mapImg: 'https://lh3.googleusercontent.com/H41Pa3qimYRsdoEvDgpbzcaXh2jh9OWW5durBIldWmArPs61g0diHvV74REx9-Q25M6OP2ud7g-HE_JHd7_TswM6nHtzk8KMM8vDULJ2-VuVgxKr6oDSQlP5O3eu0c9Yi-YlOeo1_kI=w2400',
      map: 'https://goo.gl/maps/9WEJxMzcaNP9Leb98',
      description:'Blanca Lake nestles in a basin surrounded by Monte Cristo, Kyes and Columbia peaks, fed by the Columbia Glacier on the northwest end. The glacier’s chilly, silt-filled melt-water creates the lake’s bright turquoise green color'
    },
    {
      name: 'Palouse Falls',
      img: 'https://lh3.googleusercontent.com/0dCuQQEYnqH7pUaCSWzdBOhsBk-v_NQNt_o42mc1RGJ89mWu7PWq5xnAIwgnrB7xE2C3PTbxDCrVOZgHPqKECG-O9sgDZBCwq2-hFThHGEwQxSdfGFHPKjtOqMpwiQoZdg3RAAMyt2s=w2400',
      mapImg: 'https://lh3.googleusercontent.com/tiSmEiBs-uv3WTVZU6ZGbAJ4_ZrbsPQV_1Plah8irUGQXK2-J6qtzlfG8CptdcCz7qeD69G69dpy6NHzH0SK8vojq2VxzxrUTsTXAtE2yLm3HK8_k-x8mJauvfA5YP-93Nd-wjAs_YA=w2400',
      map: 'https://goo.gl/maps/DgyW44a1MuWMf4zs6',
      description:'The Palouse Falls lie on the Palouse River, about 4 mi (6 km) upstream of the confluence with the Snake River in southeast Washington, United States. The falls are 198 ft (60 m) in height. The falls consist of an upper fall with a drop around 20 ft (6.1 m), which lies 1,000 ft (305 m) north-northwest of the main drop, and a lower fall, with a drop of 198 ft (60 m).'
    },
  ],
  (error, data) => {
    res.redirect('/tryon-experiences')
  }
  )
});












// ============Module==================
module.exports = pnw
