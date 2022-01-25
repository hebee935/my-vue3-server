import { verify } from './token';
import { Response, NextFunction} from 'express';

export const verifyToken = (req: any, res: Response, next: NextFunction) => {
  const ver = verify(req.headers);
  if (ver) {
    req.decoded = ver;
    return next();
  }
  res.status(401).json();
};

export const verifyAdminToken = (req: any, res: Response, next: NextFunction) => {
  const ver = verify(req.headers);
  if (ver?.role === 'admin') {
    req.decoded = ver;
    return next();
  }
  res.status(403).json();
};
