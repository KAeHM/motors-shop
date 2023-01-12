import AppDataSource from '../../data-source';
import { Listing } from '../../entities/listing.entity';
import { User } from '../../entities/user.entity';
import { AppError } from '../../errors/AppError';

const listUserListingsService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const listingRepository = AppDataSource.getRepository(Listing);

  const targetUser = await userRepository.findOne({
    where: { id },
  });

  if (!targetUser) {
    throw new AppError('User not found, token may be invalid', 404);
  }

  if (!targetUser.isSeller) {
    throw new AppError('Target user is not a seller', 401);
  }

  const listings = await listingRepository.find({
    where: { user: { id } },
    relations: { user: true, comments: true },
    select: {
      user: { id: true, name: true, email: true },
      comments: { id: true, message: true, createdAt: true },
    },
  });

  console.log(listings);
  // return targetUser.listings;
  return listings;
};

export default listUserListingsService;
