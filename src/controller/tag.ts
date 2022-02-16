'use strict';

import { Tag, } from '../db/models/tag';
import ServiceError from '../lib/ServiceError';
import { errcode } from '../lib/packet';
import { ObjectId } from 'mongoose';

export const getTagList = async (opt?: any, sortOpt?: any) => {
  const tags = await Tag.getTags(opt, sortOpt);
  await Tag.populate(tags, { path: 'card' });
  return tags;
};

export const getTagById = async (id: ObjectId, throwError = true) => {
  const tag = await Tag.getTagById(id);
  await Tag.populate(tag, { path: 'card' });
  if (!tag && throwError) {
    throw new ServiceError(errcode.tag.notfound);
  }
  return tag;
};

export const createTag = async (input: any) => {
  const tag = await Tag.createTag(input);
  await Tag.populate(tag, { path: 'card' });
  return tag;
};

export const updateTag = async (id: ObjectId, input: any, throwError = true) => {
  delete input?.active;
  const tag = await Tag.updateTag(id, input);
  await Tag.populate(tag, { path: 'card' });
  if (!tag && throwError) {
    throw new ServiceError(errcode.tag.notfound);
  }
  return tag;
};

export const removeTag = async (id: ObjectId, throwError = true) => {
  const tag = await Tag.removeTag(id);
  return tag;
};
