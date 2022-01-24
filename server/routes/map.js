const fetch =require( "node-fetch");

const Map = require("../Models/Map");

const { ImgurClient } = require('imgur');

const router = require("express").Router();

//CREATE

router.post("/",async (req, res) => {


    const client = new ImgurClient({ clientId: "52f6d358a32d0fa" });


    //const image = await r.buffer()

    const image=req.body.data;

    const buff = Buffer.from(image.split("base64,")[1], 'base64');


    // console.log(buff)

    const response=await client.upload( {
        image: buff,

    } )



    let _map=req.body.map;
    _map.image=response[0].data.link;



    const newMap = new Map(_map);

    console.log("map",newMap)

  // res.send({link:response[0].data.link})


  try {
    const savedMap = await newMap.save();
    res.status(200).json({status:"success",error:null});
  } catch (err) {
    res.status(500).json(err);
  }




});

router.get("/", async(req, res) => {
const maps = await Map.find()
  res.send(maps)
});

router.get("/:map", async(req, res) => {
  

const maps = await Map.findOne({ name: req.params.map })

  res.send(maps)

});
 module.exports =router;