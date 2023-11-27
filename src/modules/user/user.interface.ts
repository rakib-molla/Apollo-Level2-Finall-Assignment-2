
import { Model } from 'mongoose';
import { UserModel } from './user.model';
export type FullName = {
 firstName: string,
 lastName: string,
}

export type Address = {
 street: string,
 city: string,
 country: string,
}

export type Orders = {
 productName : string,
 price: number,
 quantity: number,
}

export interface IUser {
 userId: number,
 username: string,
 password: string,
 fullName: FullName,
 age: number,
 email: string,
 isActive: boolean,
 hobbies: [string],
 address: Address,
 orders?: Orders,
}


export interface IUserModel extends Model<IUser>{
 isUserExists(userId: number): Promise<IUser | null>
}







