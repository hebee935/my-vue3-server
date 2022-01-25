'use strict';

import { Router, Response, NextFunction } from 'express';

import { generate } from '../../../lib/packet';
import * as User from '../../../controller/user';

const router = Router();

router.get('/', getUserList);
router.route('/:userid')
  .get(getUserOne)
  .put(updateUser)
  .delete(removeUser);
router.route('/me')
  .get(getMyInfo)
  .patch(updateMyInfo);

async function getUserList(_req: any, res: Response, next: NextFunction) {
  try {
    const users = await User.getUserList();
    res.json(generate(users));
  } catch (err) {
    next(err);
  }
}

async function getUserOne(req: any, res: Response, next: NextFunction) {
  try {
    const user = await User.getUserById(req.params.userid);
    res.json(generate(user));
  } catch (err) {
    next(err);
  }
}

async function updateUser(req: any, res: Response, next: NextFunction) {
  try {
    const user = await User.updateUser(req.params.userid, req.body);
    res.json(generate(user));
  } catch (err) {
    next(err);
  }
}

async function removeUser(req: any, res: Response, next: NextFunction) {
  try {
    const user = await User.removeUser(req.params.userid);
    res.json(generate(user));
  } catch (err) {
    next(err);
  }
}

async function getMyInfo(req: any, res: Response, next: NextFunction) {
  try {
    const user = await User.getUserById(req.user.id);
    res.json(generate(user));
  } catch (err) {
    next(err);
  }
}

async function updateMyInfo(req: any, res: Response, next: NextFunction) {
  try {
    const user = await User.updateUser(req.user.id, req.body);
    res.json(generate(user));
  } catch (err) {
    next(err);
  }
}

export default router;
