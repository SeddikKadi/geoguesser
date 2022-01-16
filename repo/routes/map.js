const Map = require("../Models/Map");


const router = require("express").Router();

//CREATE

router.post("/",async (req, res) => {
  const newMap = new Map(req.body);
  console.log(newMap)

  try {
    const savedMap = await newMap.save();
    res.status(200).json(savedMap);
  } catch (err) {
    res.status(500).json(err);
  }

});


router.get("/", async(req, res) => {
  console.log("aaaaa")

const maps = await Map.find()
  res.send(maps)

});
router.get("/:map", async(req, res) => {
  

const maps = await Map.findOne({ name: req.params.map })
  res.send(maps)

});
 module.exports =router;