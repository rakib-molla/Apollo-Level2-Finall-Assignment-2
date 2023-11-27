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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: error,
    });
  }
};

export const UserController = {
  createUser,
};
