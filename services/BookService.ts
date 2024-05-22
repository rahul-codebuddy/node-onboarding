import Book from "../Models/Book.model"
import AuthorService from "./AuthorService";
import GenreService from "./GenreService";

class BookService {
    async findAll() {
        const books = await Book.find().populate("author").populate("genre");
        return books;
    }

    // 11. Add routes for fetching a single book with Author's name and Genre with name and total books count, use aggregation.
    async findOne(bookId: string) {
        const book = await Book.findById(bookId);
        return book;
    }

    async delete(bookId: string) {
        const book = await Book.findByIdAndDelete(bookId);
        return book;
    }

    async insert(data: any) {
        const { authorId, genreId, ...payload } = data;
        const author = await AuthorService.findOne(authorId);
        if (!author) throw new Error("Invalid author id, author doesn't exist");

        const book = new Book({
            ...payload,
            author: authorId,
            genre: genreId
        });
        await book.save();

        // Saving book to author & genre:
        author.books.push(book);
        await author.save();
        await GenreService.insertBooks(genreId, book);

        return book;
    }

    // 10. Add routes for listing books by Author and Genre, use aggregation.
    async findBookListing(bookName: string) {
        if (bookName) {
            const book = await Book.aggregate([
                {
                    $match: { title: bookName }
                },
                {
                    $lookup: { from: "authors", localField: "author", foreignField: "_id", as: "author" }
                },
                {
                    $lookup: { from: "genres", localField: "genre", foreignField: "_id", as: "genres" }
                },
                {
                    $project: { title: 1, price: 1, language: 1, genres: 1, author: 1 }
                },
                {
                    $facet: {
                        books: [{ $limit: 1 }],
                        total: [{ $count: 'count' }]
                    }
                },
                {
                    $project: { book: { $arrayElemAt: ['$books', 0] }, totalBooks: { $arrayElemAt: ["$total.count", 0] } }
                }
            ]);

            return book;
        }
        const books = await Book.aggregate([
            {
                $lookup: { from: "authors", localField: "author", foreignField: "_id", as: "author" }
            },
            {
                $lookup: { from: "genres", localField: "genre", foreignField: "_id", as: "genres" }
            },
            {
                $project: { title: 1, price: 1, language: 1, genres: 1, author: 1 }
            }
        ]);

        return books;
    }
}

export default new BookService();