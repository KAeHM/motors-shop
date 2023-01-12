import AppDataSource from '../../data-source';
import { Comment } from '../../entities/comment.entity';
import { IComment } from '../../interfaces/comments';
import { User } from '../../entities/user.entity';
import { AppError } from '../../errors/AppError';
import { Listing } from '../../entities/listing.entity';

const registerCommentService = async (
  message: string,
  listingId: string,
  email: string
) => {
  const commentsRepository = AppDataSource.getRepository(Comment);
  const userRepository = AppDataSource.getRepository(User);
  const listingRepository = AppDataSource.getRepository(Listing);

  const user = await userRepository.findOne({
    where: { email },
    select: { id: true, name: true, email: true },
  });

  if (!user) {
    throw new AppError('User not exists', 400);
  }

  const listing = await listingRepository.findOne({ where: { id: listingId } });

  if (!listing) {
    throw new AppError('Listing not found', 404);
  }

  const newComment = await commentsRepository.save({
    user: user,
    message,
    createdAt: new Date(Date.now()),
    listing: listing,
  });

  return newComment;
};

export default registerCommentService;
