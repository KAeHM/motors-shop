import { Request, Response } from 'express';
import listUserListingsService from '../../services/listing/listUserListings.service';
import { instanceToPlain } from 'class-transformer';

const listUserListingsController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const listings = await listUserListingsService(id);

  return res.status(200).json(instanceToPlain(listings));
};

export default listUserListingsController;
