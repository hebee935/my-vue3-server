'use strict';

import { Todo, } from '../db/models/todo';
import ServiceError from '../lib/ServiceError';
import { errcode } from '../lib/packet';
import { ObjectId } from 'mongoose';

export const getTodoList = async (opt?: any) => {
  const todos = await Todo.getTodos(opt);
  return todos;
};

export const getTodoById = async (id: ObjectId, throwError = true) => {
  const todo = await Todo.getTodoById(id);
  if (!todo && throwError) {
    throw new ServiceError(errcode.todo.notfound);
  }
  return todo;
};

export const createTodo = async (input: any) => {
  const todo = await Todo.createTodo(input);
  return todo;
};

export const updateTodo = async (id: ObjectId, input: any, throwError = true) => {
  delete input?.active;
  const todo = await Todo.updateTodo(id, input);
  if (!todo && throwError) {
    throw new ServiceError(errcode.todo.notfound);
  }
  return todo;
};

export const removeTodo = async (id: ObjectId, throwError = true) => {
  const todo = await Todo.removeTodo(id);
  if (!todo && throwError) {
    throw new ServiceError(errcode.todo.notfound);
  }
  return todo;
};
