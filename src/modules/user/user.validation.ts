import { z } from 'zod';

export const fullNameValidationSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

export const addressValidationSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

export const ordersValidationSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string(),
  fullName: fullNameValidationSchema,
  age: z.number(),
  email: z.string(),
  isActive: z.boolean(),
  hobbies: z.string().array(),
  address: addressValidationSchema,
  orders: z.array(ordersValidationSchema).optional(),
});

export default userValidationSchema;
