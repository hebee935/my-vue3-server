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
 *         active:
 *           type: boolean
 *           default: true
 */

export interface ICard extends Document {
  user: ObjectId;
  title: string;
  contents: string;
  image: string;
  active: boolean;
}

interface CardModel extends Model<ICard> {
  getCards(opt?: any): [ICard];
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
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

CardSchema.statics = {
  getCards: async function (opt = {}) {
    return this.find(opt);
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
    const card = await this.findById(id);
    if (card) {
      card.active = false;
      await card.save();
    }
    return card;
  },
};

export const Card = model<ICard, CardModel>('Card', CardSchema);
