const PlayedGame = require("../Models/PlayedGame");
const Game = require("../Models/Game");


const router = require("express").Router();

//CREATE

router.post("/create",async (req, res) => {
    const newGame = new PlayedGame(req.body.round);


    let gamePlayed=await PlayedGame.findOne({gameId:req.body.round.gameId})

    console.log("game exists ? : ",gamePlayed)
    if(gamePlayed === null){
        try {
            const savedGamePlayed = await newGame.save();
            res.status(200).json(savedGamePlayed);
        } catch (err) {
            res.status(500).json(err);
            console.log("error !!!!!!!!!!!!!!",err)
        }
    } else{
        try {

            let update=req.body.round;
            const c =gamePlayed.guessedPoints.length



            if(req.body.id ===c ){
                gamePlayed.guessedPoints.push(update.guessedPoints)
                gamePlayed.distance.push(update.distance)
                gamePlayed.score.push(update.score)

                PlayedGame.findOneAndUpdate({gameId:update.gameId},gamePlayed,function(err) {
                    if (err)
                        console.log('error')
                    else
                        console.log('success')
                })
                res.status(200).json(gamePlayed);
            }


        } catch (err) {
            res.status(500).json(err);
            console.log("",err)
        }
    }








});

//
// router.get("/", async(req, res) => {
//     console.log("aaaaa")
//
//     const maps = await Map.find()
//     res.send(maps)
//
// });
// router.get("/:map", async(req, res) => {
//
//
//     const maps = await Map.findOne({ name: req.params.map })
//     res.send(maps)
//
// });

module.exports =router;