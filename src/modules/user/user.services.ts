
import { TOrrder, TUser } from './user.interface';
import { UserModel } from './user.model';

const creatUserIntoDB = async (user: TUser) => {
  const result = await UserModel.create(user);
  return result;
};

const getAllUsersFormDB = async () => {
  const result = await UserModel.find();
  return result;
};

const getSingleuserFromDB = async (id: string) => {
  const result = await UserModel.findOne({ userId: id });
  return result;
};

const deleteAUserFromDB = async (id: string) => {
  const result = await UserModel.deleteOne({ userId: id });
  return result;
};

const updateSingleUserFromDB = async (id: string, newData: any) => {
  const result = await UserModel.updateOne({ userId: id }, newData, {
    new: true,
  });
  return result;
};

const addProductToUserDB = async (id: number, order: TOrrder) => {
  const result = await UserModel.updateOne(
    { userId: id },
    { $push: { orders: order } },
  );
  return result;
};

export const UserServices = {
  creatUserIntoDB,
  getAllUsersFormDB,
  getSingleuserFromDB,
  deleteAUserFromDB,
  updateSingleUserFromDB,
  addProductToUserDB,
};
