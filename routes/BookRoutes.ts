import express from "express";
import { createBook, deleteBook, getAllBooks, getBookByAuthorAndGenre, getOneBook } from "../controllers/bookController";
const router = express.Router();

router.get('/:bookId', getOneBook); 
// router.post('/filter', getBookByAuthorAndGenre);
router.delete('/:bookId', deleteBook);
router.get('/', getAllBooks);
router.post('/', createBook);


export default router;