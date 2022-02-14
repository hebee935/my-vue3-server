'use strict';

import { Card, } from '../db/models/card';
import ServiceError from '../lib/ServiceError';
import { errcode } from '../lib/packet';
import { ObjectId } from 'mongoose';

export const getCardList = async (opt?: any, sortOpt?: any) => {
  const cards = await Card.getCards(opt, sortOpt);
  await Card.populate(cards, { path: 'user', select:  { nickname: 1, uid: 1, }});
  return cards;
};

export const getCardById = async (id: ObjectId, throwError = true) => {
  const card = await Card.getCardById(id);
  await Card.populate(card, { path: 'user', select:  { nickname: 1, uid: 1, }});
  if (!card && throwError) {
    throw new ServiceError(errcode.card.notfound);
  }
  return card;
};

export const createCard = async (input: any) => {
  const card = await Card.createCard(input);
  await Card.populate(card, { path: 'user', select:  { nickname: 1, uid: 1, }});
  return card;
};

export const updateCard = async (id: ObjectId, input: any, throwError = true) => {
  delete input?.active;
  const card = await Card.updateCard(id, input);
  await Card.populate(card, { path: 'user', select:  { nickname: 1, uid: 1, }});
  if (!card && throwError) {
    throw new ServiceError(errcode.card.notfound);
  }
  return card;
};

export const removeCard = async (id: ObjectId, throwError = true) => {
  const card = await Card.removeCard(id);
  return card;
};
