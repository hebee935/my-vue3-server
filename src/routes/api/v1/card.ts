'use strict';

import { Router, Response, NextFunction } from 'express';

import { generate } from '../../../lib/packet';
import * as Card from '../../../controller/card';
import { verifyToken } from '../../../lib/middleware';

const router = Router();

router.route('/')
  .get(getCardList)
  .post(verifyToken, createCard);
router.route('/:cardid')
  .get(getCardOne)
  .put(verifyToken, updateCard)
  .delete(verifyToken, removeCard);

/**
 * @swagger
 * /card:
 *   get:
 *     tags:
 *       - Card
 *     description: Get list of cards
 *     produces:
 *       - application:json
 *     responses:
 *       200:
 *         description: A list of cards.
 *         schema:
 *           $ref: '#/definitions/ListResponse'
 *       401:
 *         description: Unauthorized (invalid token)
 */

async function getCardList(req: any, res: Response, next: NextFunction) {
  try {
    const opt: any = {};
    const cards = await Card.getCardList(opt, { updatedAt: -1 });
    res.json(generate(cards));
  } catch (err) {
    next(err);
  }
}

/**
 * @swagger
 * /card:
 *   post:
 *     tags:
 *       - Card
 *     description: Create a card
 *     produces:
 *       - application:json
 *     parameters:
 *       - name: body
 *         description: card to create
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *               example: test card
 *             contents:
 *               type: string
 *               example: test card contents
 *             image:
 *               type: string
 *     responses:
 *       200:
 *         description: Success to create card
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             data:
 *               $ref: '#/components/schemas/Card'
 *       401:
 *         description: Unauthorized (invalid token)
 */

async function createCard(req: any, res: Response, next: NextFunction) {
  try {
    req.body.user = req.decoded.id;
    const card = await Card.createCard(req.body);
    res.json(generate(card));
  } catch (err) {
    next(err);
  }
}


/**
 * @swagger
 * /card/{cardid}:
 *   get:
 *     tags:
 *       - Card
 *     description: Get a card
 *     produces:
 *       - application:json
 *     parameters:
 *       - name: cardid
 *         description: card id to get
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Success to get a card.
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             data:
 *               $ref: '#/components/schemas/Card'
 *       401:
 *         description: Unauthorized (invalid token)
 */

async function getCardOne(req: any, res: Response, next: NextFunction) {
  try {
    const card = await Card.getCardById(req.params.cardid);
    res.json(generate(card));
  } catch (err) {
    next(err);
  }
}

/**
 * @swagger
 * /card/{cardid}:
 *   put:
 *     tags:
 *       - Card
 *     description: Update a card
 *     produces:
 *       - application:json
 *     parameters:
 *       - name: cardid
 *         description: card id to update
 *         in: path
 *         required: true
 *         type: string
 *       - name: body
 *         description: data to update card
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *               example: Update Card
 *             image:
 *               type: string
 *     responses:
 *       200:
 *         description: Success to updated card.
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             data:
 *               $ref: '#/components/schemas/Card'
 *       401:
 *         description: Unauthorized (invalid token)
 */

async function updateCard(req: any, res: Response, next: NextFunction) {
  try {
    const card = await Card.updateCard(req.params.cardid, req.body);
    res.json(generate(card));
  } catch (err) {
    next(err);
  }
}


/**
 * @swagger
 * /card/{cardid}:
 *   delete:
 *     tags:
 *       - Card
 *     description: Remove a card
 *     produces:
 *       - application:json
 *     parameters:
 *       - name: cardid
 *         description: card id to remove
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Success to remove a card
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             data:
 *               $ref: '#/components/schemas/Card'
 *       401:
 *         description: Unauthorized (invalid token)
 */
async function removeCard(req: any, res: Response, next: NextFunction) {
  try {
    const card = await Card.removeCard(req.params.cardid);
    res.json(generate(card));
  } catch (err) {
    next(err);
  }
}

export default router;
