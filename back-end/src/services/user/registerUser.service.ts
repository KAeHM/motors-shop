import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserRequest } from "../../interfaces/users";
import bcrypt from "bcrypt";
import { AppError } from "../../errors/AppError";

const registerUserService = async ({
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
  state,
  complement,
  description,
}: IUserRequest) => {
  const userRepository = AppDataSource.getRepository(User);

  const hashPassword = await bcrypt.hash(password, 10);

  const userCpf = await userRepository.findOneBy({ cpf: cpf });
  if (userCpf) {
    throw new AppError("Cpf already exists!", 400);
  }

  const newUser = userRepository.create({
    name: name,
    email: email,
    password: hashPassword,
    isSeller: isSeller,
    birthdate,
    cep: cep,
    city: city,
    cpf: cpf,
    number: number,
    phone: phone,
    street: street,
    state,
    complement: complement,
    description: description,
  });

  console.log(newUser);

  await userRepository.save(newUser);

  return newUser;
};

export default registerUserService;
