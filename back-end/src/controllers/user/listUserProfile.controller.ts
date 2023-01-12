import { Request, Response } from 'express';
import listUserProfileService from '../../services/user/listUserProfile.service';
import { instanceToPlain } from 'class-transformer';

const listUserProfileController = async (req: Request, res: Response) => {
  const email = req.user.userEmail;

  const user = await listUserProfileService(email);

  return res.status(200).json(instanceToPlain(user));
};

export default listUserProfileController;
