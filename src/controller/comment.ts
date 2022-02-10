'use strict';

import { Comment, } from '../db/models/comment';
import ServiceError from '../lib/ServiceError';
import { errcode } from '../lib/packet';
import { ObjectId } from 'mongoose';

export const getCommentList = async (opt?: any, sortOpt?: any) => {
  const comments = await Comment.getComments(opt, sortOpt);
  await Comment.populate(comments, { path: 'user', select:  { nickname: 1 }});
  return comments;
};

export const getCommentById = async (id: ObjectId, throwError = true) => {
  const comment = await Comment.getCommentById(id);
  await Comment.populate(comment, { path: 'user', select:  { nickname: 1 }});
  if (!comment && throwError) {
    throw new ServiceError(errcode.comment.notfound);
  }
  return comment;
};

export const createComment = async (input: any) => {
  const comment = await Comment.createComment(input);
  await Comment.populate(comment, { path: 'user', select:  { nickname: 1 }});
  return comment;
};

export const updateComment = async (id: ObjectId, input: any, throwError = true) => {
  delete input?.active;
  const comment = await Comment.updateComment(id, input);
  await Comment.populate(comment, { path: 'user', select:  { nickname: 1 }});
  if (!comment && throwError) {
    throw new ServiceError(errcode.comment.notfound);
  }
  return comment;
};

export const removeComment = async (id: ObjectId, throwError = true) => {
  const comment = await Comment.removeComment(id);
  return comment;
};
