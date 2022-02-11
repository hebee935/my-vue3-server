'use strict';

import { Schema, model, Document, Model, ObjectId } from 'mongoose';

/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           required: true
 *         user:
 *           type: string
 *           required: true
 *         status:
 *           type: string
 */

export interface ITodo extends Document {
  title: string;
  status: string;
  user: ObjectId | Object;
}

interface TodoModel extends Model<ITodo> {
  getTodos(opt?: any): [ITodo];
  getTodoById(id: ObjectId): ITodo;
  getTodoOne(opt: any): ITodo;
  createTodo(input: any): ITodo;
  updateTodo(id: ObjectId, input: any): ITodo;
  removeTodo(id: ObjectId): ITodo;
}

export const TodoSchema = new Schema<ITodo, TodoModel>(
  {
    title: { type: String, required: true },
    status: { type: String, enum: ['READY', 'PROGRESS', 'DONE'], default: 'READY', },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

TodoSchema.statics = {
  getTodos: async function (opt = {}) {
    return this.find(opt);
  },
  getTodoById: function (id) {
    return this.findById(id);
  },
  getTodoOne: function (opt = {}) {
    return this.findOne(opt);
  },
  createTodo: function (input) {
    return this.create(input);
  },
  updateTodo: function (id, input) {
    return this.findByIdAndUpdate(id, { $set: input }, { new: true });
  },
  removeTodo: async function (id) {
    const todo = await this.findByIdAndDelete(id);
    return todo;
  },
};

export const Todo = model<ITodo, TodoModel>('Todo', TodoSchema);
