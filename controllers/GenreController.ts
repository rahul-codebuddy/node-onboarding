import { Request, Response } from "express";
import GenreService from "../services/GenreService";

export const getAllGenres = async (req: Request, res: Response) => {
    try {
        const result = await GenreService.findAll();
        return res.status(200).json({ success: true, data: result });
    } catch (err: any) {
        return res.status(500).json({ success: false, msg: err.message || "Something went wrong" })
    }
}

export const getOneGenre = async (req: Request, res: Response) => {
    const { authorId } = req.params;
    try {
        const result = await GenreService.findById(authorId);
        return res.status(200).json({ success: true, data: result });
    } catch (err) {
        return res.status(500).json({ success: false, msg: "Something went wrong" })
    }
}

export const createGenre = async (req: Request, res: Response) => {
    try {
        const result = await GenreService.insert(req.body);
        return res.status(200).json({ success: true, data: result });
    } catch (err: any) {
        console.log("ERROR>>>", err)
        return res.status(500).json({ success: false, msg: err.message || "Something went wrong" })
    }
}