const Game = require("../Models/Game");


const router = require("express").Router();

//CREATE

router.post("/", async (req, res) => {
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


  try {
    const savedGame = await newGame.save();
    res.status(200).json(savedGame);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.get("/count/:map", async(req, res) => {

    try{
let count=0;
    const c = await Game.count({})

        const games = await Game.find({map:req.params.map})
        count = Math.floor(Math.random() * games.length)

    res.send(games[count])
    // let game=null;
    // while(game===null){
    //    game=await Game.findOne({map:req.params.map})
    // .skip(count).exec()
    //     count = Math.floor(Math.random() * c)
    // console.log("try")
    // }
    //
    // console.log("found game",game)
    //
    //
    //  res.send(game);
    }catch(err){
      res.status(500).json(err)
    }
  });

router.get("/", async(req, res) => {


const games = await Game.find()
  res.send(games)

});
router.get("/getgame/:gameId", async(req, res) => {

const game = await Game.find({_id: req.params.gameId})
  res.send(game)

});

 module.exports =router;