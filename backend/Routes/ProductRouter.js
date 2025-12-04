const ensureAuthenticate = require("../Middleware/AuthProduct");
const router = require("express").Router();

router.get('/', ensureAuthenticate, (req, res) => {
  console.log("----User Logged in ----", req.user);

  const products = [
    { name: "mobile", price: 10000 },
    { name: "TV", price: 20000 }
  ];

  res.status(200).json(products);
});

module.exports = router;
