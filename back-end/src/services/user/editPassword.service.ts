import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import bcrypt from "bcrypt";

const editPasswordService = async (password: string, id: string) => {
  const userRepository = AppDataSource.getRepository(User);

  if (!password) {
    throw new AppError("New password not informed", 400);
  }
  console.log(
    "DOKASDKOASOKDAKODOKASDOKAKODAODOKAKDKOASOKKAOSDKOASKOASKOASOKA",
    id
  );

  const user = await userRepository.findOne({ where: { id } });

  if (!user) {
    throw new AppError("User not found, token may be invalid", 404);
  }

  const hashPassword = await bcrypt.hash(password, 10);

  await userRepository.update(user.id, { ...user, password: hashPassword });

  return true;
};

export default editPasswordService;
