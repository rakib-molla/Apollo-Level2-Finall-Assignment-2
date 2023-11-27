import { IUser } from './user.interface';
import { UserModel } from './user.model';

const createUserIntoDB = async (userData: IUser) => {
  try {
    const result = UserModel.create(userData);
    return result;
  } catch (error) {
    throw new Error
  }
};


export const UserService = {
 createUserIntoDB
}