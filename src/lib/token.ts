import jwt from 'jsonwebtoken';
import http from 'http';

import config from '../../config';
import { logger } from './logger';

export const create = (user: any, data = {}) => {
  const tokenData = { ...{ uid: user.uid, id: user._id }, ...data };
  const option = { expiresIn: config.token_expired_days };
  const secretKey = config.secret_key;

  return jwt.sign(tokenData, secretKey, option);
};

export const generate = (data = {}, expiresIn?: string) => {
  const option = expiresIn ? { expiresIn } : {};
  const secretKey = config.secret_key;

  return jwt.sign(data, secretKey, option);
};

export const verify = (headers: http.IncomingHttpHeaders) => {
  try {
    let ver: any = null;
    const Auth = headers.authorization;

    if (Auth && /Bearer/.test(Auth)) {
      const token = Auth.replace('Bearer ', '');
      ver = jwt.verify(token, config.secret_key);
      logger.info('serialize ver: ' + JSON.stringify(ver));
    }

    return ver;
  } catch (err) {
    return null;
  }
};
