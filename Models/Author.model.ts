import mongoose, { Schema } from "mongoose";

const AuthorSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    age: { type: Number },
    nationality: { type: String },
    books: [{ type: mongoose.Types.ObjectId, ref: "Book" }]
});

const Author = mongoose.model("Author", AuthorSchema);
export default Author;