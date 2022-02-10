'use strict';

import bcrypt from 'bcrypt';
import { ObjectId } from 'mongoose';

import { User, IUser } from '../db/models/user';
import ServiceError from '../lib/ServiceError';
import { errcode } from '../lib/packet';
import config from '../../config';

export const getUserList = async (opt?: any) => {
  const users = await User.getUsers(opt);
  return users;
};

export const getUserById = async (id: ObjectId) => {
  const user = await User.getUserById(id);
  if (!user) {
    throw new ServiceError(errcode.user.notfound);
  }
  return user;
};

export const getUserOne = async (opt: any) => {
  const user = await User.getUserOne(opt);
  return user;
};

export const updateUser = async (id: ObjectId, input: any) => {
  const user = await User.updateUser(id, input);
  return user;
};

export const removeUser = async (id: ObjectId) => {
  const user = await User.removeUser(id);
  return user;
};

export const signinWith = async (uid: string, password: string) => {
  if (!uid || !password) {
    throw new ServiceError(errcode.param.wrong);
  }
  const user = await User.getUserOne({ uid, });
  if (!user) {
    throw new ServiceError(errcode.user.notfound);
  }
  if (!bcrypt.compareSync(password, user._hashed_password)) {
    throw new ServiceError(errcode.user.wrongPassword);
  }
  return user;
};

export const signupWith = async (nickname: string, uid: string, password: string) => {
  if (await User.getUserOne({ uid }) !== null) {
    throw new ServiceError(errcode.user.alreadyExists);
  }
  if (password.length < config.passwordMinLen) {
    throw new ServiceError(errcode.user.passwordMinLen);
  }
  const user = new User({ nickname, uid, password });
  return await user.save();
};