import registerCommentService from '../../services/comments/registerComment.service';
import { Response, Request } from 'express';
import { AppError, handleError } from '../../errors/AppError';

const registerCommentController = async (req: Request, res: Response) => {
  try {
    const email = req.user.userEmail;
    const { message } = req.body;
    const { listingId } = req.params
    const newComment = await registerCommentService(message, listingId, email);
    return res.status(201).json(newComment);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};

export default registerCommentController;
