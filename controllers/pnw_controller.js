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
    res.render('pnw/home.ejs', {
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
      imgA: 'https://lh3.googleusercontent.com/UTU0257wr97HE8dQnbsXGchNoG8PGOVLd_5ORn04uWgWpYiJ2MX5tQge0EUt-YNtz8h6ZkUAwN1RI8U7TlOnL37JSZvTrX_bSg6ubsUmUOfFMx4la4mrhQPtjeEMsIfcDh5ltn8Nc1M=w2400',

      imgB: 'https://lh3.googleusercontent.com/batwTkSrLZ7xAh6tgVK5vcjisNbbdvY-M9nuyBU1ipgzgpz6T-2qjK70JzYFsCndyyX1Fl3cPBoXchuPoj_dnO09rXXrg0QI-qvtxThY0ZwNcs8eLGJLdUtlfC3d7tRHQcpm3BQhh50=w2400',

      imgC: 'https://lh3.googleusercontent.com/_GV8WO3WV9dmXo9NZYbxWuMFw2bv8Q_3A0LN0VWdOH5ffCaMsb_om9zTntS5MvwRSJifVKpKS5EZLYE-36vp84iQWlsWg3ST0Mqfo2QM_wD_A2QQ-vvmvLZ8Fk7SP48oUqCpwDxXTUs=w2400',
      mapImg: 'https://lh3.googleusercontent.com/tj93SgzvXP8262966q9miqmKoq-srJRdJ8XJ93Snes1HGfqftskwsW2-x1GLzJVh8ds8jZNBus5T-1yiIdF64OYU9FtTk1dXSzoSNmLL81BsI_a34D1bJszY46H5ABXLXXBTEXKF_U4=w2400',
      map: "https://goo.gl/maps/LdG3kBFTmVpqutcz6",
      textA: `Explore the majestic Baker Lake from the seat of a kayak on this unforgettable 6 hour adventure.
       Its stunning landscapes and abundant wildlife make it a remarkable place to seek serenity and adventure.`,
       textB: `Included with every adventure you is a 5 minute drone video of your day on the lake. Get views you would never see otherwise. `,
        textC: `We can also book a campsite for you, we will set up the tents and firewood for you.`,
        hA: `Kayak Adventures`,
         hB: `Drone Videos included in package`,
          hC: `Want to stay longer`,
      description:'is a lake in northern Washington state in the United States. The lake is situated in the Mount Baker-Snoqualmie National Forest and Baker River valley southwest of North Cascades National Park and is fed by the Baker River along with numerous smaller tributaries. The lake is approximately 10 miles (16 km) north of the town of Concrete, Washington.'
    },
    {
      name: 'Blanca Lake',
      imgA: 'https://lh3.googleusercontent.com/jNMYezRKx17P2CwGcv2lr_K1tq0zwUu8CE6YCRD6Ftgu3jHpHyBOdfrvIuFbdyZB0sXoFImbFL9bhKKVW3OFNfHYni_rKIqE518Yl0yDY8nOu_mifzb7egzerNfUN2x8SzacKwLI4mE=w2400',
      imgB: 'https://lh3.googleusercontent.com/jA6Qw584X0GZx0GnRj1uaypY1nzInXraWUhTRQ2i6aUzRwTowcpYrzNztXyXvNIuOwtSQac797ho72-2D9B32pGDQ2xckzg55LhRKTFRMOiggaIhNtyi1hLvT_Ig969_dwk9Af5pibM=w2400',

      imgC: 'https://lh3.googleusercontent.com/3eQhGY25Rmdf_soGqvhSosI5SUD4zDjx1I-sSXq_LsY__Xe6LF6Z5Nfa4fanWJ561c0K_g8MXNRbq1ZhplFl7UpAkenv4nHcNwVJwoJs4VnUBFNDfHgB9JFy3vgymE8qMSBhJEPy4PY=w2400',
      mapImg: 'https://lh3.googleusercontent.com/H41Pa3qimYRsdoEvDgpbzcaXh2jh9OWW5durBIldWmArPs61g0diHvV74REx9-Q25M6OP2ud7g-HE_JHd7_TswM6nHtzk8KMM8vDULJ2-VuVgxKr6oDSQlP5O3eu0c9Yi-YlOeo1_kI=w2400',
      map: 'https://goo.gl/maps/9WEJxMzcaNP9Leb98',
      textA: `Join us in a 3.5 mile hike climing over 1,500 feel of elevation. Enjoy one of 12 species of hucklebarries along the way as they grow wild on the trail to the lake. `,
       textB: `Included with every adventure you is a 5 minute drone video of your day on the lake. Get views you would never see otherwise.`,
        textC: `Enjoy a nice dip in the lake and relax after a hard hike. `,
        hA: `A Hike to Remember`,
         hB: `Drone Videos included in package`,
          hC: `Take a Swim`,
      description:'nestles in a basin surrounded by Monte Cristo, Kyes and Columbia peaks, fed by the Columbia Glacier on the northwest end. The glacier’s chilly, silt-filled melt-water creates the lake’s bright turquoise green color'
    },
    {
      name: 'Palouse Falls',
      imgA: 'https://lh3.googleusercontent.com/yypdFw1WDtXX26MsTQ6L7FnwyxgavfgnmLRZuQZQveadSoisFkPnoDzaNhWY-h_gugaENO1VR3Wa8467CHw3OoOuLId6D4AXl9RE0o1L9zpYwyZqro4YpthfrmV39b5I68Aj9O4QeCE=w2400',
      imgB: 'https://lh3.googleusercontent.com/TOEsc7zxZo9Z4IIvf6RYUuHMMc4UIoby7LDipIUTxVbLUBFUQcFm7dzrr7TTTSeo3eR_IgXId-sMEJJG1_CxAtsKvCB7IeYWg8p1e7jjVcGsHdO0Id_IE_LozOn3L6-lntmh1DlIMXY=w2400',
      imgC: 'https://lh3.googleusercontent.com/yT8l3KBYVhlG7gRKmh0t5qZj1__SM8b_6CAQMFSBU1LKmwQKOzLNnZ4NK3PF7I8xJtI9KXIxhoOJ3w5BBCu9xPnu0o-JOGsSOffMPqQEdH8dy1tbnHfz38ZwdupQtBZXzc_qb0HwfVs=w2400',

      mapImg: 'https://lh3.googleusercontent.com/tiSmEiBs-uv3WTVZU6ZGbAJ4_ZrbsPQV_1Plah8irUGQXK2-J6qtzlfG8CptdcCz7qeD69G69dpy6NHzH0SK8vojq2VxzxrUTsTXAtE2yLm3HK8_k-x8mJauvfA5YP-93Nd-wjAs_YA=w2400',
      map: 'https://goo.gl/maps/DgyW44a1MuWMf4zs6',
      textA: `We will escort you to the bottom of the falls. A reminder children are not allowed due to the danger of this.`,
       textB: `Included with every adventure you is a 5 minute drone video of your day on the lake. Get views you would never see otherwise.`,
        textC: `We can also book a campsite for you, we will set up the tents and firewood for you.`,
        hA: `Hike down to the falls`,
         hB: `Drone Videos included in package`,
          hC: `Camp on site`,

      description:'lie on the Palouse River, about 4 mi (6 km) upstream of the confluence with the Snake River in southeast Washington, United States. The falls are 198 ft (60 m) in height. The falls consist of an upper fall with a drop around 20 ft (6.1 m), which lies 1,000 ft (305 m) north-northwest of the main drop, and a lower fall, with a drop of 198 ft (60 m).'
    },
    {
      name: 'Crater Lake',
      imgA: 'https://lh3.googleusercontent.com/Jz7spKB_L1x-9gJtr_BePPabX_1EX7dnSpi-3xotbqGKeSDAhe8BiQjSZuJW1tqjdFfcpuZxcFPPeqZyET7TsoC2PPafmHutEEEasuzviXJZ-i5LzcFcFGkUNWmau0psi0T_bbPUhlM=w2400',
      imgB: 'https://lh3.googleusercontent.com/X31wqIvCeOi98gp63BPRj4NTdw4QH0TXjnnJClCHmUw_Rkh51ZX9-Tb3_Zj5_I3cBpBD7jRHUiJCnOSMu8Kb1cmcnich9pkt53VDckqfKRCe5FZPp6RAwetRAzYw8t8JMVTJdn_F89M=w2400',
      imgC: 'https://lh3.googleusercontent.com/KsyR0E20Q0I_yBgZV6ClDuXHV5NXoTPio_-p9P38YCo_dZ3RshkLE_OU3mBbehv56oxk7l3lFesBV2K60ivjqPORxBilXMnzgzpUqsQQYzz59yjAiJeF5xtlNJdDH68y1yP-DPTNRj8=w2400',

      mapImg: 'https://lh3.googleusercontent.com/0q5Ff9A1XU95H1FlPIj5ZFZWcNAwyu4K-_EuxHBVTju-Ip4VX0i770M0CvehEn7FHDnPLHY3AnlYwcOmI3YbbPs72q91Hw1yjl0T59un51pIXx8ie--AHXHBKXHeBHyc_8Ci_fHDhbk=w2400',
      map: 'https://goo.gl/maps/zkqyc4AXY5zfMg349',
      textA: `The best way to explore Crater Lake is by boat! Learn about history, culture and geology of this amazing park and get amazing panoramic views from Wizard Island.`,
       textB: `Connect with nature - biking, hiking, fishing & lake views! Book now with confidence, safety and flexibility are our priority. Book Direct. Official Site. Special Offers.`,
        textC: `An ideal way to explore the magnificent landscape of Crater Lake National Park. You’ll find a hike to suit your pace and experience.`,
        hA: `Boat Cruise`,
         hB: `Reconnect`,
          hC: `Hiking`,

      description:'is a crater lake in south-central Oregon in the western United States. It is the main feature of Crater Lake National Park and is famous for its deep blue color and water clarity. The lake partly fills a nearly 2,148-foot-deep (655 m) caldera that was formed around 7,700 (± 150) years ago by the collapse of the volcano Mount Mazama. There are no rivers flowing into or out of the lake; the evaporation is compensated for by rain and snowfall at a rate such that the total amount of water is replaced every 250 years. With a depth of 1,949 feet (594 m), the lake is the deepest in the United States.'
    },
  ],
  (error, data) => {
    res.redirect('/tryon-experiences')
  }
  )
});












// ============Module==================
module.exports = pnw
