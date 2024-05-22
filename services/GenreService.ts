import Genre from "../Models/Genre.model";

class GenreService {
    async findAll() {
        const genres = await Genre.find().populate("books");
        return genres;
    }

    async findById(genreId: string) {
        const genre = await Genre.findById(genreId);
        return genre;
    }

    async findOne(data: {}) {
        const genre = await Genre.findOne({ data });
        return genre;
    }

    async insert(data: any) {
        const isAlreadyExist = await this.findOne(data.name);
        if (isAlreadyExist) throw new Error("Genre already exists");

        const genre = new Genre(data);
        await genre.save();
        return genre;
    }

    async insertBooks(genreIds: [], book: {}) {
        for await (const genreId of genreIds) {
            const genre = await Genre.findById(genreId);
            if (!genre) return;

            genre.books.push(book);
            await genre.save();
        }
        return true;
    }
}

export default new GenreService();