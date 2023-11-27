import { IUser } from './user.interface';
import { UserModel } from './user.model';

const createUserIntoDB = async (userData: IUser) => {
  if (await UserModel.isUserExists(userData.userId)) {
    throw new Error('User Already Exists!');
  }

  const result = UserModel.create(userData);
  return result;
};

const getallUserFromDB = async () => {
  const result = await UserModel.find();
  return result;
};

export const UserService = {
  createUserIntoDB,
  getallUserFromDB,
};
