import express from "express";
import dotenv from "dotenv";
import routes from "./routes";
import { MongoMemoryServer } from "mongodb-memory-server"
import mongoose from "mongoose";
dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.use(express.json());

// Initializing routes:
routes(app);

// DB Connection:
const connect = async () => {
    try {
        const mongod = await MongoMemoryServer.create();
        const URI = await mongod.getUri();
        // const URI = process.env.MONGO_URI || "mongodb://localhost:27017/";   // Uncomment when using local-disk mongoDB
        mongoose.connect(URI, {
            dbName: "node-train",
            user: process.env.DB_USER,
            pass: process.env.DB_PASSWORD
        });

        mongoose.connection.once('open', () => {
            console.log(`MongoDB successfully connected to ${URI}`);
        });
    } catch (err) {
        console.log(`MongoDB connection failed`);
        throw err;
    }
}

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
    connect();
});