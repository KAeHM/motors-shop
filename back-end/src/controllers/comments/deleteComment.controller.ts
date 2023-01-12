import { Request, Response } from "express";
import deleteCommentService from "../../services/comments/deleteComment.service";

const deleteCommentController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const comment = await deleteCommentService(id);

    return res.status(200).json({
      message: "Comment deleted",
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Comment not found")
        return res.status(404).json({ message: error.message });
    }
  }
};

export default deleteCommentController;
