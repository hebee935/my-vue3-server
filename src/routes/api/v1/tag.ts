'use strict';

import { Router, Response, NextFunction } from 'express';

import { generate } from '../../../lib/packet';
import * as Tag from '../../../controller/tag';
import { verifyToken } from '../../../lib/middleware';

const router = Router();

router.route('/')
  .get(getTagList)
  .post(verifyToken, createTag);
router.route('/:tagid')
  .get(getTagOne)
  .delete(verifyToken, removeTag);


/**
 * @swagger
 * /tag:
 *   get:
 *     tags:
 *       - Tag
 *     description: Get list of tags
 *     produces:
 *       - application:json
 *     responses:
 *       200:
 *         description: A list of tags.
 *         schema:
 *           $ref: '#/definitions/ListResponse'
 *       401:
 *         description: Unauthorized (invalid token)
 */

 async function getTagList(req: any, res: Response, next: NextFunction) {
  try {
    const opt: any = { card: req.query.cardid };
    const tags = await Tag.getTagList(opt);
    res.json(generate(tags));
  } catch (err) {
    next(err);
  }
}

/**
 * @swagger
 * /tag/{tag}:
 *   post:
 *     tags:
 *       - Tag
 *     description: Create a tag
 *     produces:
 *       - application:json
 *     parameters:
 *       - name: body
 *         description: tag to create
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *               example: test tag
 *             card:
 *               type: string
 *               example: card objectid
 *     responses:
 *       200:
 *         description: Success to create tag
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             data:
 *               $ref: '#/components/schemas/Tag'
 *       401:
 *         description: Unauthorized (invalid token)
 */

async function createTag(req: any, res: Response, next: NextFunction) {
  try {
    req.body.user = req.decoded.id;
    const tag = await Tag.createTag(req.body);
    res.json(generate(tag));
  } catch (err) {
    next(err);
  }
}

/**
 * @swagger
 * /tag/{tagid}:
 *   get:
 *     tags:
 *       - Tag
 *     description: Get a tag
 *     produces:
 *       - application:json
 *     parameters:
 *       - name: tagid
 *         description: tag id to get
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Success to get a tag.
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             data:
 *               $ref: '#/components/schemas/Tag'
 *       401:
 *         description: Unauthorized (invalid token)
 */

async function getTagOne(req: any, res: Response, next: NextFunction) {
  try {
    const tag = await Tag.getTagById(req.params.tagid);
    res.json(generate(tag));
  } catch (err) {
    next(err);
  }
}

/**
 * @swagger
 * /tag/{tagid}:
 *   delete:
 *     tags:
 *       - Tag
 *     description: Remove a tag
 *     produces:
 *       - application:json
 *     parameters:
 *       - name: tagid
 *         description: tag id to remove
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Success to remove a tag
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             data:
 *               $ref: '#/components/schemas/Tag'
 *       401:
 *         description: Unauthorized (invalid token)
 */
async function removeTag(req: any, res: Response, next: NextFunction) {
  try {
    const tag = await Tag.removeTag(req.params.tagid);
    console.log('tag', tag)
    res.json(generate(tag));
  } catch (err) {
    next(err);
  }
}

export default router;
