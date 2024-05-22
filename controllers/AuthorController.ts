import { Request, Response } from "express";
import AuthorService from "../services/AuthorService";

export const getAllAuthors = async (req: Request, res: Response) => {
    try {
        const result = await AuthorService.findAll();
        return res.status(200).json({ success: true, data: result });
    } catch (err: any) {
        return res.status(500).json({ success: false, msg: err.message || "Something went wrong" })
    }
}

export const getOneAuthor = async (req: Request, res: Response) => {
    const { authorId } = req.params;
    try {
        const result = await AuthorService.findOne(authorId);
        return res.status(200).json({ success: true, data: result});
    } catch (err) {
        return res.status(500).json({ success: false, msg: "Something went wrong" })
    }
}

export const createAuthor = async (req: Request, res: Response) => {
    try {
        const result = await AuthorService.insert(req.body);
        return res.status(200).json({ success: true, data: result});
    } catch (err: any) {
        console.log("ERROR>>>", err)
        return res.status(500).json({ success: false, msg: err.message || "Something went wrong" })
    }
}