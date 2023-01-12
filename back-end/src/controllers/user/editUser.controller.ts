import { Request, Response } from 'express';
import editUserService from '../../services/user/editUser.service';

const editUserController = async (req: Request, res: Response) => {
  const data = req.body;
  const checkingEmail = req.user.userEmail;

  const editedUser = await editUserService(data, checkingEmail);

  return res.status(204).json({ message: 'User updated successfully' });
};

export default editUserController;
