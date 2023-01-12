import { Request, Response } from "express";
import { json } from "stream/consumers";
import recoverPasswordService from "../../services/user/recoverPassword.service";

const recoverPasswordController = async (req: Request, res: Response) => {
  const { email } = req.body;
  await recoverPasswordService(email);
  console.log(email);

  return res.status(204).json({ message: "" });
};

export default recoverPasswordController;
