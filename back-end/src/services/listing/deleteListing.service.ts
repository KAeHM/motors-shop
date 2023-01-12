import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { Listing } from "../../entities/listing.entity";

const deleteListingService = async (id: string) => {
  const listingRepository = AppDataSource.getRepository(Listing);

  const listings = await listingRepository.find();

  const deleteListing = listings.find((listing) => listing.id === id);

  if (!deleteListing) {
    throw new AppError("Listing not found", 404);
  }

  await listingRepository.delete(deleteListing!.id);

  return true;
};
export default deleteListingService;
