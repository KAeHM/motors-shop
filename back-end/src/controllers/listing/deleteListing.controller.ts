import { Request, Response } from "express";
import deleteListingService from "../../services/listing/deleteListing.service";

const deleteListingController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const listing = await deleteListingService(id);

    return res.status(200).json({
      message: "Listing deleted",
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Listing not found")
        return res.status(404).json({ message: error.message });
    }
  }
};

export default deleteListingController;
