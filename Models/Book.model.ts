import mongoose, { Schema } from "mongoose";
import Author from "./Author.model";

const BookSchema = new Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    language: { type: String, required: true },
    pages: { type: Number },
    author: { type: mongoose.Types.ObjectId, ref: 'Author' },
    genre: [{ type: mongoose.Types.ObjectId, ref: 'Genre' }]
});

const Book = mongoose.model("Book", BookSchema);
export default Book;