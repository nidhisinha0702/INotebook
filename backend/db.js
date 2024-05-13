//import * as mongoose from "mongoose";
const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017";

const connectToMongo = () =>{
try {
    mongoose.connect(mongoURI);
  } catch (error) {
    handleError(error);
  }
}

{/*const connectToMongo = async() =>{
   await mongoose.connect(mongoURI, then(()=>
    {
        console.log("connected to mongo successfully");
    }
    ).catch((e)=>{
            console.log(e);
    }
        )
    )
    }*/}
module.exports = connectToMongo;
