import AppDataSource from '../../data-source';
import { User } from '../../entities/user.entity';
import { AppError } from '../../errors/AppError';

const listUserProfileService = async (email: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({ where: { email } });

  if (!user) {
    throw new AppError('User not found, token may be invalid', 404);
  }

  return user;
};

export default listUserProfileService;
