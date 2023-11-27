import { Request, Response } from 'express';
import { UserService } from './user.services';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const result = await UserService.createUserIntoDB(userData);
    
    res.status(200).json({
      success: true,
      message: 'User data created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message:  'something went wrong',
      error: {
       code: 500,
       description: error.message,
      },
    });
  }
};

const getallUser =async (req: Request, res: Response) => {
  try {
   const result = await UserService.getallUserFromDB();
   res.status(200).json({
    success: true,
    message: 'User are retrieved successfully',
    data: result
   })
  } catch (error) {
   res.status(500).json({
    success: false,
    message: 'something went wrong',
    error: error,
  });
  }
}


export const UserController = {
  createUser,
  getallUser,
};
