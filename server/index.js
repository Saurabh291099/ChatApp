const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const userRoute = require("./Routes/userRoute");
const chatRoute = require("./Routes/chatRoute");
const messageRoute = require("./Routes/messageRoute");

require('dotenv').config();


const port = process.env.PORT || 3000;
const uri = process.env.ATLAS_URI;

app.use(express.json())
app.use(cors())
app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);


// CRUD Operations 
app.get("/", (req, res) => {
    res.send("welcome to chat App API.....")
});


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, (req, res) => {
    console.log(`Example app listening on port: ${port}`);
});


mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connection Estabished"))
    .catch((error) => { console.log("MongoDb Connection Failed: ", error.message) })