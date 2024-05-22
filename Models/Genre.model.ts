import mongoose, { Schema } from "mongoose";

const GenreSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    books: [{ type: mongoose.Types.ObjectId, ref: "Book" }]
});

const Genre = mongoose.model("Genre", GenreSchema);
export default Genre;