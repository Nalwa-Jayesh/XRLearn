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
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increase this as needed
app.use(express.urlencoded({ limit: '50mb', extended: true }));

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
