import { Request, Response } from "express";
import editCommentService from "../../services/comments/editComment.service";

const EditCommentController = async (req: Request, res: Response) => {
  const { message } = req.body;
  const { id } = req.params;

  try {
    const comment = await editCommentService({ message }, id);
    return res.status(200).json({
      message: "Comment edited",
    });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(404).json({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export default EditCommentController;
