import { Schema, model } from 'mongoose';
import { TAddress, TFullName, TOrrder, TUser } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';

const fullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
  },
});

const addressSchema = new Schema<TAddress>({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

const ordersSchema = new Schema<TOrrder>({
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const userSchema = new Schema<TUser>({
  userId: {
    type: Number,
    // required: [true, 'Student ID is required'],
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: fullNameSchema,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  hobbies: {
    type: [{ type: String }],
  },
  address: {
    type: addressSchema,
    required: true,
  },
  orders: [ordersSchema],
});

// hash password
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.BCRYPT_SALT_ROUNDS),
  );
  next();
});

// pose save middleware/ hook
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});


export const UserModel = model<TUser>('User', userSchema);
