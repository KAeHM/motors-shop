import { Request, Response } from "express";
import editListingService from "../../services/listing/editListing.service";

const editListingController = async (req: Request, res: Response) => {
  const data = req.body;
  const { id } = req.params;

  try {
    const listing = await editListingService(data, id);
    return res
      .status(204)
      .json({ message: "Listing edited", listing: listing });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(404).json({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export default editListingController;
