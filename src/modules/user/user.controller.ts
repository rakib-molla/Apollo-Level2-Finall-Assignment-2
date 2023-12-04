import { Request, Response } from 'express';
import userValidationSchema from './user.validation';
import { UserServices } from './user.services';

const user = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const zodParsedData = userValidationSchema.parse(user);
    const result = await UserServices.creatUserIntoDB(zodParsedData);

    const UserResponseCustomize = {
      userId: result.userId,
      username: result.username,
      fullName: result.fullName,
      age: result.age,
      email: result.email,
      isActive: result.isActive,
      hobbies: result.hobbies,
      address: result.address,
      orders: result.orders,
    };

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: UserResponseCustomize,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      code: 404,
      message: 'User not found',
      error: error,
    });
  }
};

const getaAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFormDB();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: error,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getSingleuserFromDB(userId);

    const UserResponseCustomize = {
      userId: result?.userId,
      username: result?.username,
      fullName: result?.fullName,
      age: result?.age,
      email: result?.email,
      isActive: result?.isActive,
      hobbies: result?.hobbies,
      address: result?.address,
      orders: result?.orders,
    };

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: UserResponseCustomize,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: '404',
        description: 'User Not Found',
      },
    });
  }
};

const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.deleteAUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: error,
    });
  }
};

const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const updateData = req.body;
    const checkUserExists = await UserServices.getSingleuserFromDB(userId);

    if (!checkUserExists) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    const result = await UserServices.updateSingleUserFromDB(
      userId,
      updateData,
    );

    res.status(200).json({
      success: true,
      message: 'User update Successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: err,
    });
  }
};

const addProductToUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userIdNum = parseFloat(userId);
    const updateData = req.body;
    const zodValidationData = userValidationSchema.safeParse(updateData);
    console.log('validaion', zodValidationData);

    const checkUserExists = UserServices.getSingleuserFromDB(userId);

    if (
      !checkUserExists ||
      (Array.isArray(checkUserExists) && checkUserExists.length === 0)
    ) {
      return res.status(404).json({
        success: false,
        message: 'User not Found',
        error: {
          code: '404',
          description: 'User Not Found',
        },
      });
    }

    const result = await UserServices.addProductToUserDB(userIdNum, updateData);
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: err,
    });
  }
};

export const UserControllers = {
  user,
  getaAllUsers,
  getSingleUser,
  deleteSingleUser,
  updateSingleUser,
  addProductToUser,
};
