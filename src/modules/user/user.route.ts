import express from 'express';
import { UserControllers } from './user.controller';
// import { UserController } from './user.controller';

const router = express.Router();

router.post('/', UserControllers.user);

router.get('/', UserControllers.getaAllUsers);

router.get('/:userId', UserControllers.getSingleUser);

router.delete('/:userId', UserControllers.deleteSingleUser);

router.put('/:userId', UserControllers.updateSingleUser);

router.put('/:userId/orders', UserControllers.addProductToUser);

router.get('/:userId/orders', UserControllers.getUserOrders);

router.get('/:userId/orders/total-price', UserControllers.getTotalPriceForUser);

export const UserRouter = router;
