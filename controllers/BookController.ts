import { Request, Response } from "express";
import BookService from '../services/BookService';

export const getAllBooks = async (req: Request, res: Response) => {
    const { bookName } = req.query;
    try {
        const result = await BookService.findBookListing(String(bookName));
        return res.status(200).json({ success: true, data: result });
    } catch (err) {
        return res.status(500).json({ success: false, msg: "Something went wrong" })
    }
}

export const getOneBook = async (req: Request, res: Response) => {
    const { bookId } = req.params;
    try {
        const result = await BookService.findOne(bookId);
        return res.status(200).json({ success: true, data: result });
    } catch (err) {
        return res.status(500).json({ success: false, msg: "Something went wrong" })
    }
}

export const getBookByAuthorAndGenre = async (req: Request, res: Response) => {
    const { bookId } = req.params;
    try {
        // const result = await BookService.findByAuthorAndGenre(bookId);
        // return res.status(200).json({ success: true, data: result});
    } catch (err) {
        return res.status(500).json({ success: false, msg: "Something went wrong" })
    }
}

export const createBook = async (req: Request, res: Response) => {
    try {
        const result = await BookService.insert(req.body);
        return res.status(200).json({ success: true, data: result });
    } catch (err: any) {
        console.log("ERROR>>>", err)
        return res.status(500).json({ success: false, msg: err.message || "Something went wrong" })
    }
}

export const deleteBook = async (req: Request, res: Response) => {
    try {
        const result = await BookService.delete(req.params.bookId);
        return res.status(200).json({ success: true, data: result });
    } catch (err: any) {
        console.log("ERROR>>>", err)
        return res.status(500).json({ success: false, msg: err.message || "Something went wrong" })
    }
}