'use strict';

import { File, } from '../db/models/file';
import ServiceError from '../lib/ServiceError';
import { errcode } from '../lib/packet';
import { writeFile, deleteFile, } from '../lib/utils';
import { ObjectId } from 'mongoose';

export const getFileList = async (opt?: any) => {
  const files = await File.getFiles(opt);
  return files;
};

export const getFileById = async (id: ObjectId, throwError = true) => {
  const file = await File.getFileById(id);
  if (!file && throwError) {
    throw new ServiceError(errcode.file.notfound);
  }
  return file;
};

export const createFile = async (input: any) => {
  const file = await File.createFile(input);
  return file;
};

export const updateFile = async (id: ObjectId, input: any, throwError = true) => {
  delete input?.active;
  const file = await File.updateFile(id, input);
  if (!file && throwError) {
    throw new ServiceError(errcode.file.notfound);
  }
  return file;
};

export const removeFile = async (id: ObjectId, throwError = true) => {
  const file = await File.removeFile(id);
  if (!file && throwError) {
    throw new ServiceError(errcode.file.notfound);
  }
  await deleteFile(file._path);
  return file;
};

export const uploadObjects = async (files: any, category = '') => {
  const result = [];
  for (let i = 0; i < files.length; i++) {
    const buffer = files[i].buffer;
    const file = new File({
      name: files[i].originalname,
      mimetype: files[i].mimetype,
      size: files[i].size,
      category,
    });
    file._path = `${category}/${file._id}`;

    await writeFile(file._id, file.category, buffer);
    result.push(await file.save());
  }
  return result;
};

export const changeObject = async (id: ObjectId, filedata: any) => {
  if (!(id && filedata)) {
    throw new ServiceError(errcode.param.wrong);
  }
  const file = await File.getFileById(id);
  if (!file) {
    throw new ServiceError(errcode.file.notfound);
  }
  const buffer = filedata.buffer;
  file.name = filedata.originalname;
  file.mimetype = filedata.mimetype;
  file.size = filedata.size;
  await writeFile(file._path, '', buffer);

  return await file.save();
};
