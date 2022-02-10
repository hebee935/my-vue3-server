'use strict';

import { Schema, model, Document, Model, ObjectId } from 'mongoose';

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           required: true
 */

export interface IComment extends Document {
  user: ObjectId;
  card: ObjectId;
  parent?: ObjectId;
  message: string;
}

interface CommentModel extends Model<IComment> {
  getComments(opt?: any, sortOpt?: any): [IComment];
  getCommentById(id: ObjectId): IComment;
  getCommentOne(opt: any): IComment;
  createComment(input: any): IComment;
  updateComment(id: ObjectId, input: any): IComment;
  removeComment(id: ObjectId): IComment;
}

export const CommentSchema = new Schema<IComment, CommentModel>(
  {
    message: { type: String, required: true },
    card: { type: Schema.Types.ObjectId, ref: 'Card', required: true },
    parent: { type: Schema.Types.ObjectId, ref: 'Comment', },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

CommentSchema.statics = {
  getComments: async function (opt = {}, sortOpt = {}) {
    return this.find(opt).sort(sortOpt);
  },
  getCommentById: function (id) {
    return this.findById(id);
  },
  getCommentOne: function (opt = {}) {
    return this.findOne(opt);
  },
  createComment: function (input) {
    return this.create(input);
  },
  updateComment: function (id, input) {
    return this.findByIdAndUpdate(id, { $set: input }, { new: true });
  },
  removeComment: async function (id) {
    const comment = await this.findByIdAndDelete(id);
    return comment;
  },
};

export const Comment = model<IComment, CommentModel>('Comment', CommentSchema);
