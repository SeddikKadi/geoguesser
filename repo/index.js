const express = require('express');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors")
dotenv.config();
const gameRoute=require("./routes/game");
const mapRouter=require("./routes/map")

const app = express();

app.get('/', (req, res) => res.send('Hello world!'));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });
  app.use(cors());
  app.use(express.json());  
  app.use("/api/games",gameRoute)
  app.use("/api/maps",mapRouter)
 



const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));