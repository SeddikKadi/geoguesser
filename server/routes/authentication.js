const User = require("../Models/User");
const {OAuth2Client} =require("google-auth-library")


const router = require("express").Router();

//CREATE

router.post("/",async (req, res) => {
    const token = req.body.tokenId;
    console.log("tokenId",token)
    const googleClient = new OAuth2Client({
        clientId: `${process.env.GOOGLE_CLIENT_ID}`,
    });

    const ticket = await googleClient.verifyIdToken({
        idToken: token,
        audience: `${process.env.GOOGLE_CLIENT_ID}`,
    });

    const payload = ticket.getPayload();

    let user = await User.findOne({email: payload?.email});
    if (!user) {
        user = await new User({
            email: payload?.email,
            avatar: payload?.picture,
            name: payload?.name,
        });
        await user.save();
    }
    res.json({ user, token });

});
router.post("/create", async(req, res) => {

    console.log("Usser0",req.body)

    const user = await User.findOne({email:req.body.user.email,password:req.body.user.password});
    if(user){
        //user exists
        res.json({ user:null,error:"email allready in use"});
    }else{
        //user do not exists
        await req.body.user.save();
    }

    console.log(user)
    res.send(user)
});
module.exports =router;