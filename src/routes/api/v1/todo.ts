'use strict';

import { Router, Response, NextFunction } from 'express';

import { generate } from '../../../lib/packet';
import * as Todo from '../../../controller/todo';

const router = Router();

router.route('/')
  .get(getTodoList)
  .post(createTodo);
router.route('/:todoid')
  .get(getTodoOne)
  .put(updateTodo)
  .delete(removeTodo);

/**
 * @swagger
 * /todo:
 *   get:
 *     tags:
 *       - Todo
 *     description: Get list of todos
 *     produces:
 *       - application:json
 *     responses:
 *       200:
 *         description: A list of todos.
 *         schema:
 *           $ref: '#/definitions/ListResponse'
 *       401:
 *         description: Unauthorized (invalid token)
 */

async function getTodoList(req: any, res: Response, next: NextFunction) {
  try {
    const opt: any = {};
    if (req.query.category) opt.category = req.query.category;

    const todos = await Todo.getTodoList(opt);
    res.json(generate(todos));
  } catch (err) {
    next(err);
  }
}

/**
 * @swagger
 * /todo:
 *   post:
 *     tags:
 *       - Todo
 *     description: Create a todo
 *     produces:
 *       - application:json
 *     parameters:
 *       - name: body
 *         description: todo to create
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             text:
 *               type: string
 *               example: test todo
 *     responses:
 *       200:
 *         description: Success to create todo
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             data:
 *               $ref: '#/components/schemas/Todo'
 *       401:
 *         description: Unauthorized (invalid token)
 */

async function createTodo(req: any, res: Response, next: NextFunction) {
  try {
    const todo = await Todo.createTodo(req.body);
    res.json(generate(todo));
  } catch (err) {
    next(err);
  }
}


/**
 * @swagger
 * /todo/{todoid}:
 *   get:
 *     tags:
 *       - Todo
 *     description: Get a todo
 *     produces:
 *       - application:json
 *     parameters:
 *       - name: todoid
 *         description: todo id to get
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Success to get a todo.
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             data:
 *               $ref: '#/components/schemas/Todo'
 *       401:
 *         description: Unauthorized (invalid token)
 */

async function getTodoOne(req: any, res: Response, next: NextFunction) {
  try {
    const todo = await Todo.getTodoById(req.params.todoid);
    res.json(generate(todo));
  } catch (err) {
    next(err);
  }
}

/**
 * @swagger
 * /todo/{todoid}:
 *   put:
 *     tags:
 *       - Todo
 *     description: Update a todo
 *     produces:
 *       - application:json
 *     parameters:
 *       - name: todoid
 *         description: todo id to update
 *         in: path
 *         required: true
 *         type: string
 *       - name: body
 *         description: data to update todo
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             text:
 *               type: string
 *               example: Update Todo
 *     responses:
 *       200:
 *         description: Success to updated todo.
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             data:
 *               $ref: '#/components/schemas/Todo'
 *       401:
 *         description: Unauthorized (invalid token)
 */

async function updateTodo(req: any, res: Response, next: NextFunction) {
  try {
    const todo = await Todo.updateTodo(req.params.todoid, req.body);
    res.json(generate(todo));
  } catch (err) {
    next(err);
  }
}


/**
 * @swagger
 * /todo/{todoid}:
 *   delete:
 *     tags:
 *       - Todo
 *     description: Remove a todo
 *     produces:
 *       - application:json
 *     parameters:
 *       - name: todoid
 *         description: todo id to remove
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Success to remove a todo
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             data:
 *               $ref: '#/components/schemas/Todo'
 *       401:
 *         description: Unauthorized (invalid token)
 */
async function removeTodo(req: any, res: Response, next: NextFunction) {
  try {
    const todo = await Todo.removeTodo(req.params.todoid);
    res.json(generate(todo));
  } catch (err) {
    next(err);
  }
}

export default router;
