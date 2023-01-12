import { Request, Response } from 'express';
import listOneListingService from '../../services/listing/listOneListing.service';
import { AppError, handleError } from '../../errors/AppError';
import { instanceToPlain } from 'class-transformer';

const listOneListingController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const listing = await listOneListingService(id);

    return res.status(200).json(instanceToPlain(listing));
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};

export default listOneListingController;
