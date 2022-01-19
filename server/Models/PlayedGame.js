const mongoose = require('mongoose');

const PlayedGameSchema = new mongoose.Schema({
    map: {
        type: String
    },
    gameId: {
        type: String
    },
    usergameid:{
        type:String
    },
    userId:{
        type:String
    },
    guessedPoints:{
        type:Array
    },
    distance:{
        type:Array
    },
    score:{
        type:[Number]
    },
    timeRound:{
        type:String
    }
});
module.exports=mongoose.model("PlayedGame", PlayedGameSchema);