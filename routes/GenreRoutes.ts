import express from "express";
import { createGenre, getAllGenres, getOneGenre } from "../controllers/GenreController";
const router = express.Router();

router.get('/:genreId', getOneGenre);
router.get('/', getAllGenres);
router.post('/', createGenre);

export default router;