import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/AppError";
import listCommentsService from "../../services/comments/listComment.service";

const listCommentsController = async (req: Request, res: Response) => {
  try {
    const comments = await listCommentsService();
    return res.json(comments);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};

export default listCommentsController;
