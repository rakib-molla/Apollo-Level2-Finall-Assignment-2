import { Schema, model } from "mongoose";
import { Address, FullName, IUser, Orders } from "./user.interface";


const fullNameSchema = new Schema<FullName>({
 firstName:{
  type: String,
 },
 lastName:{
  type: String,
 }
})

const addressSchema = new Schema<Address>({
 street: {
  type: String,
 },
 city: {type: String,},
 country: {type: String,}
})

const OrdersSchema = new Schema<Orders>({
 productName: { type: String,},
 price: { type: Number,},
 quantity: { type: Number,}
})

const userSchema = new Schema<IUser>({
 userId: {
  type: Number, 
  required: [true, 'user id required'],
  unique: true ,
 },
 username:{
  type: String,
  unique: true,
 },
 password:{
  type: String,
 },
 fullName: fullNameSchema,
 age:{
  type: Number,
 },
 email: {
  type: String,
 },
 isActive:{
  type: Boolean,
  default: true,
 },
 hobbies: [String],
 address: addressSchema,
 orders: [OrdersSchema]
})

export const UserModel = model<IUser>('User', userSchema);