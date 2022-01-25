'use strict';

import { Schema, model, Document, Model, ObjectId, } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  nickname: string;
  uid: string;
  active: boolean;
  _hashed_password: string;
  _role: string;
}

interface UserModel extends Model<IUser> {
  getUsers(opt: any): [IUser];
  getUserById(id: ObjectId): IUser;
  getUserOne(opt: any): IUser;
  createUser(input: any): IUser;
  upsertUser(input: any): IUser;
  updateUser(id: ObjectId, input: any): IUser;
  removeUser(id: ObjectId): IUser;
}

export const UserSchema = new Schema<IUser>(
  {
    nickname: { type: String, required: true },
    uid: { type: String, required: true, unique: true },
    active: { type: Boolean, default: true },

    _hashed_password: { type: String, },
    _role: { type: String, required: true, default: 'user' },
  },
  { timestamps: true },
);

UserSchema.statics = {
  getUsers: function (opt = {}) {
    return this.find(opt);
  },
  getUserById: function (id) {
    return this.findById(id);
  },
  getUserOne: function (opt = {}) {
    return this.findOne(opt);
  },
  createUser: function (input) {
    return this.create(input);
  },
  upsertUser: function (input) {
    return this.findOneAndUpdate(input, { $set: input }, { upsert: true });
  },
  updateUser: function (id, input) {
    return this.findByIdAndUpdate(id, { $set: input }, { new: true });
  },
  removeUser: async function (id) {
    const user = await this.findById(id);
    user.active = false;
    return await user.save();
  },
};

UserSchema.virtual('password').set(function(this:IUser, password: string) {
  if (password) this._hashed_password = bcrypt.hashSync(password, 10);
});

UserSchema.set('toJSON', {
	transform: (_doc, ret) => {
		delete ret._role;
		delete ret._hashed_password;
		return ret;
	}
});

export const User = model<IUser, UserModel>('User', UserSchema);
