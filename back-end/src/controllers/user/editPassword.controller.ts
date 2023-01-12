import { Request, Response } from "express";
import editPasswordService from "../../services/user/editPassword.service";

const editPasswordController = async (req: Request, res: Response) => {
  const { password, id } = req.body;

  const changePassword = await editPasswordService(password, id);

  return res.status(204).json({ message: "Password changed successfully" });
};

export default editPasswordController;
