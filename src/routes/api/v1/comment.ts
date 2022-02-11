'use strict';

import { Router, Response, NextFunction } from 'express';

import { generate } from '../../../lib/packet';
import * as Comment from '../../../controller/comment';

const router = Router();

router.route('/')
  .get(getCommentList)
  .post(createComment);
router.route('/:commentid')
  .get(getCommentOne)
  .put(updateComment)
  .delete(removeComment);


/**
 * @swagger
 * /card/{cardid}/comment:
 *   get:
 *     tags:
 *       - Comment
 *     description: Get list of comments
 *     produces:
 *       - application:json
 *     responses:
 *       200:
 *         description: A list of comments.
 *         schema:
 *           $ref: '#/definitions/ListResponse'
 *       401:
 *         description: Unauthorized (invalid token)
 */

 async function getCommentList(req: any, res: Response, next: NextFunction) {
  try {
    const opt: any = { card: req.query.cardid };
    const comments = await Comment.getCommentList(opt);
    res.json(generate(comments));
  } catch (err) {
    next(err);
  }
}

/**
 * @swagger
 * /card/{cardid}/comment:
 *   post:
 *     tags:
 *       - Comment
 *     description: Create a comment
 *     produces:
 *       - application:json
 *     parameters:
 *       - name: body
 *         description: comment to create
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: test comment
 *             card:
 *               type: string
 *               example: card objectid
 *             parent:
 *               type: string
 *               example: comment objectid
 *     responses:
 *       200:
 *         description: Success to create comment
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             data:
 *               $ref: '#/components/schemas/Comment'
 *       401:
 *         description: Unauthorized (invalid token)
 */

async function createComment(req: any, res: Response, next: NextFunction) {
  try {
    req.body.user = req.decoded.id;
    const comment = await Comment.createComment(req.body);
    res.json(generate(comment));
  } catch (err) {
    next(err);
  }
}

/**
 * @swagger
 * /comment/{commentid}:
 *   get:
 *     tags:
 *       - Comment
 *     description: Get a comment
 *     produces:
 *       - application:json
 *     parameters:
 *       - name: commentid
 *         description: comment id to get
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Success to get a comment.
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             data:
 *               $ref: '#/components/schemas/Comment'
 *       401:
 *         description: Unauthorized (invalid token)
 */

async function getCommentOne(req: any, res: Response, next: NextFunction) {
  try {
    const comment = await Comment.getCommentById(req.params.commentid);
    res.json(generate(comment));
  } catch (err) {
    next(err);
  }
}

/**
 * @swagger
 * /comment/{commentid}:
 *   put:
 *     tags:
 *       - Comment
 *     description: Update a comment
 *     produces:
 *       - application:json
 *     parameters:
 *       - name: commentid
 *         description: comment id to update
 *         in: path
 *         required: true
 *         type: string
 *       - name: body
 *         description: data to update comment
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: test comment
 *     responses:
 *       200:
 *         description: Success to updated comment.
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             data:
 *               $ref: '#/components/schemas/Comment'
 *       401:
 *         description: Unauthorized (invalid token)
 */

async function updateComment(req: any, res: Response, next: NextFunction) {
  try {
    const comment = await Comment.updateComment(req.params.commentid, req.body);
    res.json(generate(comment));
  } catch (err) {
    next(err);
  }
}


/**
 * @swagger
 * /comment/{commentid}:
 *   delete:
 *     tags:
 *       - Comment
 *     description: Remove a comment
 *     produces:
 *       - application:json
 *     parameters:
 *       - name: commentid
 *         description: comment id to remove
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Success to remove a comment
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             data:
 *               $ref: '#/components/schemas/Comment'
 *       401:
 *         description: Unauthorized (invalid token)
 */
async function removeComment(req: any, res: Response, next: NextFunction) {
  try {
    const comment = await Comment.removeComment(req.params.commentid);
    res.json(generate(comment));
  } catch (err) {
    next(err);
  }
}

export default router;
