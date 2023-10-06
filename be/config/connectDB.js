const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
URI = process.env.MONGO_URI;

async function connectDB() {
    const conn = await mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
}

connectDB().then( () => {
    console.log("Sucessfully connected to database")
  }
).catch (
    err => {
        console.log(`Error Occurred : ${err}`)
    }
)

module.exports = connectDB;