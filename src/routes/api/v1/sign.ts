'use strict';

import { Router, Response, NextFunction } from 'express';

import { signinWith, signupWith, } from '../../../controller/user';
import { generate } from '../../../lib/packet';
import { verify, create, } from '../../../lib/token';

const router = Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.post('/signout', signout);

async function signin(req: any, res: Response, next: NextFunction) {
  try {
    const { uid, password } = req.body;
    const user = await signinWith(uid, password);
    const token = create(user);
    res.json(generate({ user, token }));
  } catch (err) {
    next(err);
  }
}

async function signup(req: any, res: Response, next: NextFunction) {
  try {
    const { nickname, uid, password } = req.body;
    const user = await signupWith(nickname, uid, password);
    const token = create(user);
    res.json(generate({ user, token }));
  } catch (err) {
    next(err);
  }
}

async function signout(req: any, res: Response, next: NextFunction) {
  try {
    const result = verify(req.headers) ? true : false;
    res.json({ success: result });
  } catch (err) {
    next(err);
  }
}
export default router;
