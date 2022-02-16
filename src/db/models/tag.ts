'use strict';

import { Schema, model, Document, Model, ObjectId } from 'mongoose';

/**
 * @swagger
 * components:
 *   schemas:
 *     Tag:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           required: true
 *         card:
 *           type: string
 *           required: true
 */

export interface ITag extends Document {
  title: string;
  card: ObjectId;
}

interface TagModel extends Model<ITag> {
  getTags(opt?: any, sortOpt?: any): [ITag];
  getTagById(id: ObjectId): ITag;
  getTagOne(opt: any): ITag;
  createTag(input: any): ITag;
  updateTag(id: ObjectId, input: any): ITag;
  removeTag(id: ObjectId): ITag;
}

export const TagSchema = new Schema<ITag, TagModel>(
  {
    title: { type: String, required: true },
    card: { type: Schema.Types.ObjectId, ref: 'Card', required: true },
  },
  { timestamps: true },
);

TagSchema.statics = {
  getTags: async function (opt = {}, sortOpt = {}) {
    return this.find(opt).sort(sortOpt);
  },
  getTagById: function (id) {
    return this.findById(id);
  },
  getTagOne: function (opt = {}) {
    return this.findOne(opt);
  },
  createTag: function (input) {
    return this.create(input);
  },
  updateTag: function (id, input) {
    return this.findByIdAndUpdate(id, { $set: input }, { new: true });
  },
  removeTag: async function (id) {
    const tag = await this.findByIdAndDelete(id);
    return tag;
  },
};

export const Tag = model<ITag, TagModel>('Tag', TagSchema);
