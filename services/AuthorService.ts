import Author from "../Models/Author.model";

class AuthorService {
    async findAll() {
        const authors = await Author.find().populate("books");
        return authors;
    }

    async findOne(authorId: string) {
        const author = await Author.findById(authorId).populate("books");
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