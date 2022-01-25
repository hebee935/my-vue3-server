'use strict';

import { Schema, model, Document, Model, ObjectId } from 'mongoose';

/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       properties:
 *         text:
 *           type: string
 *           required: true
 */

export interface ITodo extends Document {
  text: string;
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
    text: { type: String, required: true },
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
