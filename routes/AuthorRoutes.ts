import express from "express";
import { createAuthor, getAllAuthors, getOneAuthor } from "../controllers/AuthorController";
const router = express.Router();

router.get('/:authorId', getOneAuthor);
router.get('/', getAllAuthors);
router.post('/', createAuthor);

export default router;