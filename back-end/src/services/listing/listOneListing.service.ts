import AppDataSource from '../../data-source';
import { AppError } from '../../errors/AppError';
import { Listing } from '../../entities/listing.entity';

const listOneListingService = async (id: string) => {
  const listingRepository = AppDataSource.getRepository(Listing);

  const specificListing = listingRepository.find({
    where: { id },
    relations: ['user', 'comments', 'comments.user'],
    // select: ['user'],
  });

  if (!specificListing) {
    throw new AppError('Listing not found', 404);
  }

  return specificListing;
};

export default listOneListingService;
