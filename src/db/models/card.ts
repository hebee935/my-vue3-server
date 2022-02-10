'use strict';

import { Schema, model, Document, Model, ObjectId } from 'mongoose';

/**
 * @swagger
 * components:
 *   schemas:
 *     Card:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           required: true
 *         contents:
 *           type: string
 *         image:
 *           type: string
 */

export interface ICard extends Document {
  user: ObjectId | Object;
  title: string;
  contents: string;
  image: string;
}

interface CardModel extends Model<ICard> {
  getCards(opt?: any, sortOpt?: any): [ICard];
  getCardById(id: ObjectId): ICard;
  getCardOne(opt: any): ICard;
  createCard(input: any): ICard;
  updateCard(id: ObjectId, input: any): ICard;
  removeCard(id: ObjectId): ICard;
}

export const CardSchema = new Schema<ICard, CardModel>(
  {
    title: { type: String, required: true },
    contents: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    image: { type: String },
  },
  { timestamps: true },
);

CardSchema.statics = {
  getCards: async function (opt = {}, sortOpt = {}) {
    return this.find(opt).sort(sortOpt);
  },
  getCardById: function (id) {
    return this.findById(id);
  },
  getCardOne: function (opt = {}) {
    return this.findOne(opt);
  },
  createCard: function (input) {
    return this.create(input);
  },
  updateCard: function (id, input) {
    return this.findByIdAndUpdate(id, { $set: input }, { new: true });
  },
  removeCard: async function (id) {
    const card = await this.findByIdAndDelete(id);
    return card;
  },
};

export const Card = model<ICard, CardModel>('Card', CardSchema);
