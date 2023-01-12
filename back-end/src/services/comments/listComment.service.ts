import AppDataSource from '../../data-source';
import { AppError } from '../../errors/AppError';
import { Comment } from '../../entities/comment.entity';

const listCommentsService = async () => {
  const commentRepository = AppDataSource.getRepository(Comment);

  const comments = await commentRepository.find({
    relations: { user: true },
    select: { user: { id: true, name: true } },
  });

  if (!comments) {
    throw new AppError('No comment found', 404);
  }
  return comments;
};

export default listCommentsService;
