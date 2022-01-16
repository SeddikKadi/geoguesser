const Game = require("../Models/Game");


const router = require("express").Router();

//CREATE

router.post("/", async (req, res) => {
  console.log(req.body)
  const newGame = new Game(req.body);

  try {
    const savedGame = await newGame.save();
    res.status(200).json(savedGame);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post("/localisations",async (req, res) => {
  const newGame = new Game(req.body);
  console.log(newGame)

  try {
    const savedGame = await newGame.save();
    res.status(200).json(savedGame);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.get("/count", async(req, res) => {
  console.log("get count !!")

    try{

    const c = await Game.count({})
    console.log(c)
     res.status.status(200).json(c);
    }catch(err){
      res.status(500).json(err)
    }
  });

router.get("/", async(req, res) => {
  console.log("get game !!")

const maps = await Game.find()
  res.send(maps)

});

 module.exports =router;