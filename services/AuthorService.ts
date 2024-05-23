import Author from "../Models/Author.model";
import redisClient from "../config/redisConfig";

class AuthorService {
    async findAll() {
        const authors = await Author.find().populate("books");
        return authors;
    }

    async findOne(authorId: string) {
        // Retriving from cached:
        const cachedData = await redisClient.get(authorId);
        // console.log(">>>>>>>CACHED DATA<<<<<<<<<", cachedData)
        if (cachedData) return JSON.parse(cachedData);
        const author = await Author.findById(authorId).populate("books");
        // console.log(">>>>>>>SENDING FROM DB<<<<<<<<<");
        redisClient.set(authorId, JSON.stringify(author));
        return author;
    }

    async insert(data: any) {
        const author = new Author(data);
        await author.save();

        return author;
    }

    async update(data: any) {
        // const author = await Author.findOne({id: data.authorId})
        // return author;
    }
}

export default new AuthorService();