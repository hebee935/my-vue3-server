'use strict';

import { Schema, model, Document, Model, ObjectId, } from 'mongoose';

export interface IFile extends Document {
  name: string;
  mimetype: string;
  size: number;
  _path: string;
  category?: string;
}

interface FileModel extends Model<IFile> {
  getFiles(opt: any): [IFile];
  getFileById(id: ObjectId): IFile;
  getFileOne(opt: any): IFile;
  createFile(input: any): IFile;
  upsertFile(input: any): IFile;
  updateFile(id: ObjectId, input: any): IFile;
  removeFile(id: ObjectId): IFile;
}

export const FileSchema = new Schema<IFile>(
  {
    name: { type: String, },
    mimetype: { type: String, },
    size: { type: Number, },
    category: { type: String, },
    _path: { type: String, },
  },
  { timestamps: true },
);

FileSchema.statics = {
  getFiles: function (opt = {}) {
    return this.find(opt);
  },
  getFileById: function (id) {
    return this.findById(id);
  },
  getFileOne: function (opt = {}) {
    return this.findOne(opt);
  },
  createFile: function (input) {
    return this.create(input);
  },
  upsertFile: function (input) {
    return this.findOneAndUpdate(input, { $set: input }, { upsert: true });
  },
  updateFile: function (id, input) {
    return this.findByIdAndUpdate(id, { $set: input }, { new: true });
  },
  removeFile: async function (id) {
    const file = await this.findById(id);
    file.active = false;
    return await file.save();
  },
};

FileSchema.set('toJSON', {
	transform: (_doc, ret) => {
    ret.path = `${process.env.PWD}/data/${ret._path}`;
		delete ret._path;
		return ret;
	}
});

export const File = model<IFile, FileModel>('File', FileSchema);
