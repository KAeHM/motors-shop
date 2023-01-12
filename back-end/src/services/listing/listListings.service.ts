import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { Listing } from "../../entities/listing.entity";

const listListingsService = async () => {
  const listingRepository = AppDataSource.getRepository(Listing);

  const listings = await listingRepository.find();

  if (!listings) {
    throw new AppError("No listing found", 404);
  }
  return listings;
};

export default listListingsService;
