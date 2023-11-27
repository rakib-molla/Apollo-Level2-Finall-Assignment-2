import { Schema, model } from "mongoose";
import { Address, FullName, IUser, Orders, IUserModel } from "./user.interface";
import bcrypt from 'bcrypt'
import config from '../../config/index'

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

const userSchema = new Schema<IUser, IUserModel>({
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

// pre save middleware / hook: will work on create() save()
userSchema.pre('save', async function (next) {
 // console.log(this, 'pre hook: we will save to data');
 const user = this; // this refer for document
 user.password = await bcrypt.hash(
   user.password,
   Number(config.BCRYPT_SALT_ROUNDS),
 );
 next();
});

// post middleware
userSchema.post('save', function (doc, next) {
 doc.password = '***';
 // console.log( 'post hook: we save to data');
 next();
});

// creating a custom static method
userSchema.statics.isUserExists = async function(userId: number){
 const existingUser = await UserModel.findOne({userId});
 return existingUser;
}

export const UserModel = model<IUser, IUserModel>('User', userSchema);