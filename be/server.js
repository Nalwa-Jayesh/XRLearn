const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require("./config/connectDB");
const sttRoutes = require("./routes/speechToTextRoutes");
const ttsRoutes = require("./routes/textToSpeechRoutes");
const summaryRoutes = require("./routes/textSummaryRoutes");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");
const cardRoutes = require("./routes/cardRoutes");

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.get("/", (req,res) => {
    res.send("Welcome to RX Learn");
})

app.use("/api/stt", sttRoutes);
app.use("/api/tts", ttsRoutes);
app.use('/api/summary', summaryRoutes);
app.use("/api/user", userRoutes);
app.use("/api/usernotes", noteRoutes);
app.use("/api/cards", cardRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server started at PORT : ${process.env.PORT}`)
})