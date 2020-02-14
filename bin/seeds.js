const mongoose = require("mongoose");

const productModel = require("../models/product");

const someProductsTemplates = [
    {name: "Bananes Jaunes",
    isTemplate: true,
    ref: "to defined",
    price: 0,
    quantity: 0,
    description : "Quelles sont belles mes bananes jaunes !",
    type: "banana",
    category: "vegetables",
    likes :0,
    image: "https://res.cloudinary.com/dyvosdvps/image/upload/v1581330687/tikok-Products/Bananes_jaunes_zeaetg.jpg"
  },
    {name: "Figues pommes",
    isTemplate: true,
    ref: "to defined",
    price: 0,
    quantity: 0,
    description : "Les meilleurs meilleures bananes du monde !",
    type: "banana",
    category: "fruits",
    likes :0,
    image: "https://res.cloudinary.com/dyvosdvps/image/upload/v1581331011/tikok-Products/figue_pomme_yw5igs.jpg"
  },
    {name: "Ti nains",
    isTemplate: true,
    ref: "to defined",
    price: 0,
    quantity: 0,
    description : "Epi lan mori",
    type: "banana",
    category: "vegetables",
    likes :0,
    image: "https://res.cloudinary.com/dyvosdvps/image/upload/v1581332029/tikok-Products/ti_nain_cygdvv.jpg"
  },
    {name: "Vivanneau",
    isTemplate: true,
    ref: "to defined",
    price: 0,
    quantity: 0,
    description : "Qu'il est beau mon vivanneau",
    type: "Fish",
    category: "fishes & seafood",
    likes :0,
    image: "https://res.cloudinary.com/dyvosdvps/image/upload/v1581332153/tikok-Products/vivaneau_glkhai.png"
  },
    {name: "Balaou",
    isTemplate: true,
    ref: "to defined",
    price: 0,
    quantity: 0,
    description : " Balaou Balaou Balaou",
    type: "fishes",
    category: "fishes & seafood",
    likes :0,
    image: "https://res.cloudinary.com/dyvosdvps/image/upload/v1581332248/tikok-Products/balaou_epgn04.jpg"
  },
    {name: "Oursins",
    isTemplate: true,
    ref: "to defined",
    price: 0,
    quantity: 0,
    description : "Attention ça pique",
    type: "seafood",
    category: "fishes & seafood",
    likes :0,
    image: "https://res.cloudinary.com/dyvosdvps/image/upload/v1581332728/tikok-Products/oursins_vrkslw.jpg"
  },
];

  mongoose
  .connect(process.env.MONGO_URI, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });
  
productModel.insertMany(someProductsTemplates)
.then(res => console.log("ok db inserted"))
.catch(err => console.log(err));


module.exports = someProductsTemplates;