import AppDataSource from "../../data-source";
import { Comment } from "../../entities/comment.entity";
import { AppError } from "../../errors/AppError";
import { ICommentEdit } from "../../interfaces/comments";

const editCommentService = async ({ message }: ICommentEdit, id: string) => {
  const commentRepository = AppDataSource.getRepository(Comment);

  const comments = await commentRepository.findOne({ where: { id } });

  if (!comments) {
    throw new AppError("Comment not found", 404);
  }

  const comment = new Comment();
  comment.message = message;

  commentRepository.update(id, { message: comment.message });

  await commentRepository.save(comment);

  return comment;
};

export default editCommentService;
