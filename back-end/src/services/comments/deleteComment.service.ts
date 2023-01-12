import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { Comment } from "../../entities/comment.entity";

const deleteCommentService = async (id: string) => {
  const commentRepository = AppDataSource.getRepository(Comment);

  const comments = await commentRepository.find();
  const deleteComment = comments.find((comment) => comment.id === id);

  if (!deleteComment) {
    throw new AppError("Comment not found", 404);
  }

  await commentRepository.delete(deleteComment!.id);
  return true;
};

export default deleteCommentService;
