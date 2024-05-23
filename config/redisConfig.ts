import { createClient } from "redis";

const redisClient = createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: 6379
    }
});

redisClient.on("error", (error) => console.log(`Connection to redis failed`, error));
redisClient.connect();

export default redisClient;