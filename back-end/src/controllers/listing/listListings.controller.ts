import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/AppError";
import listListingsService from "../../services/listing/listListings.service";

const listListingsController = async (req: Request, res: Response) => {
  try {
    const listings = await listListingsService();
    return res.json(listings);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};

export default listListingsController;
