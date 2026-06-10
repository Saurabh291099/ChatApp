const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const userRoute = require("./Routes/userRoute");
const chatRoute = require("./Routes/chatRoute");
const messageRoute = require("./Routes/messageRoute");

require('dotenv').config();

const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

app.get("/", (req, res) => {
    res.send("welcome to chat App API.....")
});

const connectDatabase = async () => {
    if (uri) {
        try {
            await mongoose.connect(uri);
            console.log("MongoDB connected using ATLAS_URI");
            return;
        } catch (error) {
            console.log("Atlas connection failed:", error.message);
        }
    }

    const { MongoMemoryServer } = require('mongodb-memory-server');
    const memoryServer = await MongoMemoryServer.create();
    const memoryUri = memoryServer.getUri();

    await mongoose.connect(memoryUri);
    console.log("MongoDB connected using in-memory database (local development fallback)");
};

const startServer = async () => {
    try {
        await connectDatabase();
        app.listen(port, () => {
            console.log(`ChatApp server listening on port ${port}`);
        });
    } catch (error) {
        console.log("Failed to start server:", error.message);
        process.exit(1);
    }
};

startServer();
