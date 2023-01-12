import registerListingService from "../../services/listing/registerListing.service";
import { Response, Request } from "express";
import { AppError, handleError } from "../../errors/AppError";

const registerListingController = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const userEmail = req.user.userEmail
    const newListing = await registerListingService(userEmail, data);
    return res.status(201).json(newListing);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};

export default registerListingController;
