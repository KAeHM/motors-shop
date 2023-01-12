import AppDataSource from "../../data-source";
import { Listing } from "../../entities/listing.entity";
import { AppError } from "../../errors/AppError";
import { IListingEdit } from "../../interfaces/listings";

const editListingService = async (data: IListingEdit, id: string) => {
  const listingRepository = AppDataSource.getRepository(Listing);

  const listings = await listingRepository.findOne({ where: { id } });

  if (typeof data !== "object") {
    throw new AppError("Request format is not an object", 400);
  }

  await listingRepository.update(id, { ...listings, ...data });

  return true;
};

export default editListingService;
