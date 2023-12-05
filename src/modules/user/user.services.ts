import { TOrrder, TUser } from './user.interface';
import { UserModel } from './user.model';

const creatUserIntoDB = async (user: TUser) => {
  // built-in ----static method----
  if (await UserModel.isUserExists(user.userId)) {
    throw new Error('User is already exists!!!!');
  }
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

const getUserSpecifyOrder = async (userId: number) => {
  try {
    const user = await UserModel.findOne({ userId: userId });

    return user;
  } catch (error) {
    throw new Error('Error fetching user from the database');
  }
};

const getTotalPriceForUser = async (userId: number) => {
  try {
      

      const user = await UserModel.findOne({ userId: userId });

      if (user) {
          const userOrders = user.orders || [];
          const totalPrice = userOrders.reduce((acc, order) => acc + order.price * order.quantity, 0);

          return totalPrice;
      } else {
          throw new Error('User not found');
      }
  } catch (error) {
      throw new Error('Error calculating total price');
  }
};

export const UserServices = {
  creatUserIntoDB,
  getAllUsersFormDB,
  getSingleuserFromDB,
  deleteAUserFromDB,
  updateSingleUserFromDB,
  addProductToUserDB,
  getUserSpecifyOrder,
  getTotalPriceForUser
};
