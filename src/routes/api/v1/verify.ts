'use strict';

import { Router, Request, Response, NextFunction } from 'express';
import { verify } from '../../../lib/token';
import { getUserOne } from '../../../controller/user';

const router = Router();

router.post('/', verifyUser);
router.post('/uid/:uid', verifyUid);

async function verifyUser(req: Request, res: Response, next: NextFunction) {
  try {
    const result = verify(req.headers) ? true : false;
    res.json({ success: result });
  } catch (err) {
    next(err);
  }
}

async function verifyUid(req: Request, res: Response, next: NextFunction) {
  try {
    const uid = req.params.uid;
    const user = await getUserOne({ uid });
    res.json({ success: user ? false : true, });
  } catch (err) {
    next(err);
  }
}

export default router;
