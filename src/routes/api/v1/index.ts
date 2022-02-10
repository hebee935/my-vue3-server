'use strict';

import { Router, Request, Response, NextFunction } from 'express';
import swaggerUi from 'swagger-ui-express';

import { logger } from '../../../lib/logger';
import ServiceError from '../../../lib/ServiceError';
import { errcode } from '../../../lib/packet';
import { verifyToken } from '../../../lib/middleware';

import signRoute from './sign';
import userRoute from './user';
import verifyRoute from './verify';
import cardRoute from './card';
import todoRoute from './todo';
import commentRoute from './comment';
import swaggerRoute from './swagger';

const router = Router();

router.use('/docs', swaggerRoute);

router.use('/', signRoute);
router.use('/card', cardRoute);
router.use('/comment', commentRoute);
router.use('/user', userRoute);

router.use('/verify', verifyRoute);
router.use(verifyToken);

router.use('/todo', todoRoute);

router.use((_req, res, _next) => {
  res.status(404).json({});
});

router.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  logger.trace(err);
  if (err && err.name === 'ServiceError') {
    return res.status(err.status || 500).json(err.toErrorJson());
  }
  if (err && err.name === 'MongoError') {
    const dbError = new ServiceError(
      errcode.mongo(err.code, err.errmsg),
      200,
      err,
    );
    return res.status(dbError.status).json(dbError.toErrorJson());
  }
  if (err && err.name === 'CastError' && err.kind === 'ObjectId') {
    const idError = new ServiceError(errcode.param.objectid, 200, err);
    idError.msg = err.message; // override ServiceError msg;
    return res.status(idError.status).json(idError.toErrorJson());
  }
  logger.error(JSON.stringify(err, null, 4));
  return res.status(err.status || 500).json({ msg: err.message });
});

export default router;
