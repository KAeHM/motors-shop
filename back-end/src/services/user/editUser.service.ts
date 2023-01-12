import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import { IUserEdit } from "../../interfaces/users";

const editUserService = async (data: IUserEdit, email: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({ where: { email } });

  if (!user) {
    throw new AppError("User not found, token may be invalid", 404);
  }

  if (typeof data !== "object") {
    throw new AppError("Request format is not an object", 400);
  }

  if (data.email && data.email !== email) {
    const emailChecker = await userRepository.findOne({
      where: { email: data.email },
    });

    if (emailChecker) {
      throw new AppError("Given email is already registered", 409);
    }
  }

  if (data.cpf && data.cpf !== user.cpf) {
    const cpfChecker = await userRepository.findOne({
      where: { cpf: data.cpf },
    });

    if (cpfChecker) {
      throw new AppError("Given CPF is already registered", 409);
    }
  }

  if (data.password) {
    delete data.password;
  }

  await userRepository.update(user.id, { ...user, ...data });

  return true;
};

export default editUserService;
