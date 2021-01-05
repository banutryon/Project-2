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
// ============Pricing Route==================
pnw.get('/pricing', isAuthenticated, (req, res) => {
  res.render(
    'pnw/pricing.ejs',
    {currentUser: req.session.currentUser}
  )
})

// ============Checkout Route==================
pnw.get('/checkout', isAuthenticated, (req, res) => {
  res.render(
    'pnw/checkout.ejs',
    {currentUser: req.session.currentUser}
  )
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
    res.redirect('/tryon-experiences/new')
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
      description:'Baker Lake is a lake in northern Washington state in the United States. The lake is situated in the Mount Baker-Snoqualmie National Forest and Baker River valley southwest of North Cascades National Park and is fed by the Baker River along with numerous smaller tributaries. The lake is approximately 10 miles (16 km) north of the town of Concrete, Washington.'
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
      description:'Blanca Lake nestles in a basin surrounded by Monte Cristo, Kyes and Columbia peaks, fed by the Columbia Glacier on the northwest end. The glacier’s chilly, silt-filled melt-water creates the lake’s bright turquoise green color'
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

      description:' Palouse Falls lie on the Palouse River, about 4 mi (6 km) upstream of the confluence with the Snake River in southeast Washington, United States. The falls are 198 ft (60 m) in height. The falls consist of an upper fall with a drop around 20 ft (6.1 m), which lies 1,000 ft (305 m) north-northwest of the main drop, and a lower fall, with a drop of 198 ft (60 m).'
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

      description:'Crater Lake is a crater lake in south-central Oregon in the western United States. It is the main feature of Crater Lake National Park and is famous for its deep blue color and water clarity. The lake partly fills a nearly 2,148-foot-deep (655 m) caldera that was formed around 7,700 (± 150) years ago by the collapse of the volcano Mount Mazama. There are no rivers flowing into or out of the lake; the evaporation is compensated for by rain and snowfall at a rate such that the total amount of water is replaced every 250 years. With a depth of 1,949 feet (594 m), the lake is the deepest in the United States.'
    },
    {
      name: 'Diablo Lake',
      imgA: 'https://lh3.googleusercontent.com/j42MIidTIAFXB1rODdsTxkXvDqvDMtYzb1UbVLpBP6h46_y7jqzOKZJwQdX8CsGKv8KkIg148YDmW3XhHtZ3TnmvjHW_Rt3dO6Jd0fJpAO7UbJ2CZEZg2kiROEWb1a_adu7dU4idFNQ=w2400',
      imgB: 'https://lh3.googleusercontent.com/0_taM2N7CRPtVskxr5fWUc6Rul2cFcq9UZ0zB18MQx7zN24ORngjPNdN2jxjxpWFem22MRpo33i6C27Q3_SPIoMn7_FGnrqYtqLv6Cf1wPK3abGr72ZsB62uAnb1kIwU-I89dGFvuRc=w2400',
      imgC: 'https://lh3.googleusercontent.com/rPAWDjGVxx3pns32v1xPVbmMbdSiOPSmw5JvglPbKOYX0xXdCGUcnutqAWVFI49HoKF8cEuGxrHIdxxyF1djoTnv34mbMe2LZIsv1V5B1BlmSiOEl7wywCN2H6XXyqGeh4-iQF0xMME=w2400',

      mapImg: 'https://lh3.googleusercontent.com/ypjZZYQ_V_ZReCREblo4-SgGOHyTi0zvWYYNd1FgnFJBfvdAEM1k5M2a1v8_oGWQnZ7MY-epVfjYljCsY0VRLHFVmhwC4T2BpX6cpaHJYtJ89vudIQ9w6gHq1vXmCQVPq7I9CgtCWLk=w2400',
      map: 'https://goo.gl/maps/GK5bJa92qUk2K4Mh9',
      textA: `Explore the majestic Diablo Lake from the seat of a kayak on this unforgettable 6 hour adventure.
       Its stunning landscapes and abundant wildlife make it a remarkable place to seek serenity and adventure.`,
       textB: `Included with every adventure you is a 5 minute drone video of your day on the lake. Get views you would never see otherwise.`,
        textC: `We can also book a campsite for you, we will set up the tents and firewood for you.`,
        hA: `Kayak Adventures`,
        hB: `Drone Videos included in package`,
        hC: `Camp on site`,

      description:"Diablo Lake is a reservoir in the North Cascade mountains of northern Washington state, United States. Created by Diablo Dam, the lake is located between Ross Lake and Gorge Lake on the Skagit River at an elevation of 1,201 feet (366 m) above sea level. Diablo Lake is part of the Skagit River Hydroelectric Project and managed by Seattle City Light. Diablo Lake Trail, designated a National Recreation Trail in 1981, runs for 3.80 miles (6.12 km) along the lake's northern shore."
    },
    {
      name: 'Mount Rainier',
      imgA: 'https://lh3.googleusercontent.com/Ickq-OxHhf6lX4Xg-BfQthg_A5Y99r3TaIFAbaQUoPk9wdX3Q0uv4nbhuokEyiK7tGsmFhYuGzZwcfthr7tstlDPAEdGUNtmFkLy6dNb5hD5Ez9Qyq656UYbL_seT9Z-2y-9L6jUZ-4=w2400',
      imgB: 'https://lh3.googleusercontent.com/FDuJ8autA4e5ZaG8tsGNJaOQtdEJiovgw6rgBvnSePcy-JbJY3Qfb-xUmWg5FuLAySlzOvIMz3dCDSG2p1e4EdR60MLbMime9P_xrLuPoGWHmavEuEgsNl4Epv1WOvcwA0x8F5jmXwU=w2400',
      imgC: 'https://lh3.googleusercontent.com/dMw4DylfnfOpbHobFrQen7NgR-c34yhlQMi6jsAFuzJrRKbaJNZX4eykgOCyGgzcWHQggvF5tejc6rRCOu44g0lIXzZR7_PEXFV15FCS7CwQyVYBRFB6j-joIRhx1-wewPATY_XrGj0=w2400',

      mapImg: 'https://lh3.googleusercontent.com/7j9EqayqaT7Kgqrf74gzC0qv-NMygPLjnC8m05eBYJtuebtNaEJ2vis3czYUtGpJ_mXzyg6yaar3dHia1g7rmJKAy7wl7kh-HbD9hP0J8XkmQ2ZJn7ptOFrO8j1cpTZCePjTOCUl_6o=w2400',
      textA: `Spend the night camping in the scenic lowland forests of Mt. Rainier National Park. Although campsites are available on a first come, first served basis, we can reserve sites at the Cougar Rock and Ohanapecosh campgrounds`,
       textB: `All climbing routes on Mount Rainier require climbers to possess some level of technical climbing skill. This includes ascending and descending the mountain with the use of technical climbing equipment such as crampons, ice axes, harnesses, and ropes.`,
        textC: `An ideal way to explore the majestic landscape of Mt Rainier. Hike your way to the beatuiful Ohanapeosh waterfall and take in the beatuiful landscape.`,
        hA: `Camping`,
         hB: `Climbing`,
          hC: `Hiking`,

      description:'Mount Rainier also known as Tahoma or Tacoma, is a large active stratovolcano in the Cascade Range of the Pacific Northwest, located in Mount Rainier National Park about 59 miles (95 km) south-southeast of Seattle. With a summit elevation of 14,411 ft (4,392 m), it is the highest mountain in the U.S. state of Washington and the Cascade Range, the most topographically prominent mountain in the contiguous United States, and the tallest in the Cascade Volcanic Arc.'
    },
    {
      name: 'New Dungeness Lighthouse',
      imgA: 'https://lh3.googleusercontent.com/tBizbcCOiwQiCboGjtw11nr1jzZZ0aqftwrtaBZCbr2WLo00q08cnh4d5dWMDzieeCl6ppGW2g1A1HxHWWT_kClEw8h4cSIaHuZxi6rM8FFuLgHV03wRzu_hliTB8Jz2gaQ2NPILwdU=w2400',
      imgB: 'https://lh3.googleusercontent.com/gcP3iNUVNEpHq9ErNFB6R57Tfbf8rPPgZ4RbCOW3o7IcUmb2BYWnUK9qojX1sXDG_WfYRdsgedEU9YvGqfdsp6gR32DnFYKpET9YywiQHwHIEJrBmuf7vWFEenEHqKcoKgEVpoAPYrk=w2400',
      imgC: 'https://lh3.googleusercontent.com/i2ZwDWKXv74gityfdqW2YCaBOMZgCnry8gFZ1hTEzbZgzh24ix_7DD4H3QibNd8OuzViCbaD3GBiaWBiTHK2_uG3A8n5x3MRjgyPV4SACSfo1kFR8kkQSFbqCoNCfoPu7duUeJf_Hfw=w2400',

      mapImg: 'https://lh3.googleusercontent.com/ZTTdxkd2zFp8wuvm8zxUzWVmK9NzbdVs_hMj6_sB5Ur0qLSrj5-4mmPaVwaem8GE8ufW7PY_M5Xmtm24kBjTGyLJ0MYwJtm_V9AJNES_cuEW7931uHbI13llbCKpbQ0-LFcWE4X4oHA=w2400',
      textA: `The best way to explore this lighthouse is by boat! Learn about history and culture of this important structure.`,
       textB: `A Serenity Luxury Picnic is perfect for birthdays, anniversaries, marriage proposals or any other special occasion.  We do all the work and you enjoy the wonderful experience of having an effortless, memorable picnic.`,
        textC: `The lighthouse is reached by a 5 mile hike from the Refuge parking lot along the North side of the Dungeness Spit.   There is a $3 Refuge permit fee for a party of four adults payable at the Kiosk.`,
        hA: `Boat Cruise`,
         hB: `Pinic on the beach`,
          hC: `Hiking`,

      description:'New Dungeness Lighthouse is a functioning aid to navigation on the Strait of Juan de Fuca, located on the Dungeness Spit in the Dungeness National Wildlife Refuge near Sequim, Clallam County, in the U.S. state of Washington. It has been in continuous operation since 1857, although the current lighthouse tower is 26 feet (7.9 m) shorter than when first constructed.'
    },
    {
      name: 'Mount St. Helens',
      imgA: 'https://lh3.googleusercontent.com/25QqZ0JrbNCHrMvTvRssYiw8dlE6xo3G-XOSZUI1jd3jE2KsxAfm8nqrcmPepMX3RybJJ9wj-9mfBJCK1vF61hL7e6uAcbjA4H2_vpyuOzGkXht0XH5L1GBop0ojgSB4jhnXxixuWLM=w2400',
      imgB: 'https://lh3.googleusercontent.com/PJO6eUO3QQ3J6LttmtCCfIrn7NJIZmepk0-AUo8dPMahh9rPpoD5QGURi9b66DEn1GTm-nPjtO7thMEZzTPywqrK-U3AASN-Alhf6R-Nlc4DJTzOjSr3iGp609HQ7IpkjGgkstgU0fY=w2400',
      imgC: 'https://lh3.googleusercontent.com/EvGhBdqXBGw7ttPqEY2sCAHyj1ZUyJ90S77zkDfP9fTeyfpwpz8tjoYhQ9Ecy7IlRYm1R4qQx8Fhzeo7xDRRCnCQTJOzDHKCq8mrW-eJotUv8vmKWM7VJ_0ohl5U-W8woqMLSTJ-IPo=w2400',

      mapImg: 'https://lh3.googleusercontent.com/AO8QVsXIvIUEsbqXpSpqu_ov8-wmI-ItU_lnsBNuP_cExk6g0WB7Eiq3QJ-eGrPBNgDd65uKg0wGUqxqfviknoebfJl-l1OVyrgbArFq5635vu58Y07gPFmlBTtuOgW2pXHBvEDEu1I=w2400',
      map: 'https://goo.gl/maps/tKEZUpHxPhJGpgwW7',
      textA: `This is a great trail to gain an appreciation of the devastating effects of the eruption of Mount St. Helens and to marvel at the vitality of nature's return. The loop trail takes you by small ponds, the North Fork Toutle River and hummock mounds up to 500 feet high.`,
      textB: `Included with every adventure you is a 5 minute drone video of your day on the lake. Get views you would never see otherwise.`,
      textC: `Ape Cave is a 2-mile-long lava tube formed 2000 years ago by a lava flow that followed a deep watercourse. It's the longest lava tube in the western hemisphere.`,
      hA: `A Hike to Remember`,
      hB: `Drone Videos included in package`,
      hC: `Cave Exploring`,

      description:'Mount St. Helens is an active stratovolcano located in Skamania County, Washington, in the Pacific Northwest region of the United States. It is 50 miles (80 km) northeast of Portland, Oregon and 96 miles (154 km) south of Seattle, Washington. Mount St. Helens takes its English name from the British diplomat Lord St Helens, a friend of explorer George Vancouver who made a survey of the area in the late 18th century. The volcano is located in the Cascade Range and is part of the Cascade Volcanic Arc, a segment of the Pacific Ring of Fire that includes over 160 active volcanoes. This volcano is well known for its ash explosions and pyroclastic flows.'
    },
    {
      name: 'Mt Hood',
      imgA: 'https://lh3.googleusercontent.com/LGGTMy00eOHwBGmfA-rw_o0IXHsRBgtFf4jrp_hKV5NumO7udh_paD7RYy0EPk9Yktlu3j2i-58uIONvCVMZep-dsPagsC0_XHMUv-eq4oNC7cyqTkUuGs8Q_zuefp7HM0KVRA-N-zA=w2400',
      imgB: 'https://lh3.googleusercontent.com/bZuNosxCWC-gs_RHBzIZCI3MfuChjVhlKI3YU4ABPR-6z8-VjV-cCh_1Eab0-r84YUvSeSWJsywg_9uKYULp29781U-ib1QDsJ0SognDE4pBU8wQ66eSYLzGRKBpjgrXL7RW4hfOPeM=w2400',
      imgC: 'https://lh3.googleusercontent.com/Fat8qqx5LtDiFHYBTibXCbRF2H_kZgtTyfOua8OviWsunDW2vhBV54kn8ExZsPO3iMcswk0qKwGWYHS4U-BZQt28jPEii-QF0Z4y-IXhjXhiRo2pUpBex_PXyyB4iwW4sSuWaWspcQ8=w2400',

      mapImg: 'https://lh3.googleusercontent.com/_Nq6YNKEcYiLr_WPZk_WE5XMXxFfJdSC6YoUt8osnVCq3dNlww0zOKystxwpjrNDQboFnJMV5Zic1pNcXAiYNrP_uuQkW7lgud6Ny1RYobQrw1rW-3IKWtBNo5mn6A93LXMDuMDjxRg=w2400',
      map: 'https://goo.gl/maps/7H9F6aPmh25YNiiw9',
      textA: `There are roughly 1000 miles of trail on the Mt. Hood National Forest. Please observe rules and regulations, stay on designated trails, be alert and courteous, minimize your impact, and avoid muddy areas.`,
      textB: `Nearly 2.5 million visitors come to Mt. Hood National Forest each year just for the chance to see forest wildlife and enjoy forested landscapes. A short drive across the forest reveals several different life zones including temperate Douglas-fir rainforests on the west-side of Mt. Hood, arctic-alpine near timberline, and semi-arid ponderosa pine forests on the east-side.`,
      textC: `With over 150 lakes and 14 Wild & Scenic Rivers, Mt. Hood National Forest abounds with water-related recreational activities.`,
      hA: `Hiking awaits you`,
      hB: `Nature Viewing`,
      hC: `Water Activities`,

      description:`Mt Hood is a potentially active stratovolcano in the Cascade Volcanic Arc. It was formed by a subduction zone on the Pacific coast and rests in the Pacific Northwest region of the United States. It is located about 50 miles (80 km) east-southeast of Portland, on the border between Clackamas and Hood River counties. In addition to being Oregon's highest mountain, it is one of the loftiest mountains in the nation based on its prominence, and it offers the only year-round lift-served skiing in North America.`
    },
    {
      name: 'Oregon Coast',
      imgA: 'https://lh3.googleusercontent.com/DXCv6xZe_cIF430rGoiR4Cu-mTR5RdRMNP1vfMlmduEftzlQpD8XFoGnr_dHYC5wlr19vKi6AKZm5tjSHUxHgbGkvZsKuYR26n0fleJaU9AWcsTvMg-evK7cOFxmIsH3D9XYg663Bo0=w2400',
      imgB: 'https://lh3.googleusercontent.com/GlPr5IjSpM8SDCXPGm1x4vH3wOE9436aZzJqAls9zg9NQtmCr0OT11hoKx9fuk3viRzJUw2tX-yzDM9ur0_5b4L20A6ooRwvcBcHj8kmJyo6Lq3vTUHvMc72AXX_YIVN4jmVkl84FnA=w2400',
      imgC: 'https://lh3.googleusercontent.com/dq9RtTjOPRE47CtpPJOJQy8GHtw9zyjNgbMmkot-tiJoVJPUnHGceFJPE8HsOk8_oCCxVifXzUPE-hwQwQ8l7-sMA1iSEU6LBfnbOWDORyMXCquRMhgZazS6WDVWuLRh98CIgotZT24=w2400',

      mapImg: 'https://lh3.googleusercontent.com/8fpDc5DGUivQPpXhkrKeV3S2JuSCKcOYEfeVHv_-pmdaK61EQm3Ze-dzsp1Dcq5v2ecfXYA8j4NogQnWi8-oKxd4ZWMoct2oiaOa98gC_DG_Qvc2FoonyYHJdRnks1yNbaLRbYGRC_s=w2400',
      map: 'https://goo.gl/maps/uY6vmPCsqTJtJear5',
      textA: `Stops along the way, Neahkahnie Viewpoint, Oswald West State Park, Cannon Beach, and Ecola State Park `,
      textB: `A short drive from the north end of Cannon Beach leads to some of the Oregon Coast's best hiking trails in Ecola State Park and the 2.5-mile round trip hike to secluded Crescent Beach is a stunner.`,
      textC: `Nearly four miles of sandy beach stretch out north and south of downtown Cannon Beach with Oregon's iconic Haystack Rock sitting approximately midway on this scenic paradise. Venture further and you'll find more beaches and dramatic rock formations that have made the Oregon Coast famous for its dramatic landscapes.`,
      hA: `Private Oregon Coastal Tour`,
      hB: `Hiking`,
      hC: `Haystack Rock`,

      description:'Cannon Beach is a city in Clatsop County, Oregon, United States. The population was 1,690 at the 2010 census. Cannon Beach is a popular coastal tourist destination in Oregon, famous for Haystack Rock, a 235 ft (72 m) sea stack that juts out along the Pacific Coast. In 2013, National Geographic listed Cannon Beach as "one of the world’s 100 most beautiful places."'
    },

  ],
  (error, data) => {
    res.redirect('/tryon-experiences')
  }
  )
});












// ============Module==================
module.exports = pnw
