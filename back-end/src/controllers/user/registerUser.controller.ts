import { AppError } from "../../errors/AppError";
import registerUserService from "../../services/user/registerUser.service";
import { handleError } from "../../errors/AppError";
import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";

const registerUserController = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      password,
      isSeller,
      birthdate,
      cep,
      city,
      cpf,
      number,
      phone,
      street,
      complement,
      description,
      state,
    } = req.body;
    const newUser = await registerUserService({
      name,
      email,
      password,
      isSeller,
      birthdate,
      cep,
      city,
      cpf,
      number,
      phone,
      street,
      complement,
      description,
      state,
    });
    return res.status(201).json(instanceToPlain(newUser));
    return res.status(201).json(newUser);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};

export default registerUserController;
