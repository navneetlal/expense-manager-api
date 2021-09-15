import type { Request, Response, NextFunction } from 'express';
import { JsonWebTokenError, TokenExpiredError, NotBeforeError } from 'jsonwebtoken';

import { jwtVerify } from '../utils/token';
import Status from '../utils/response';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const whitelist = [
    '/login'
  ]
  if (whitelist.includes(req.path)) return next()
  const authHeader = req.headers.authorization;
  if (authHeader) {
    try {
      const token = authHeader.split(' ')[1] ?? '';
      const claims = await jwtVerify(token)
      res.locals.user = { ...claims as any };
      return next();
    } catch (error) {
      if (
        error instanceof JsonWebTokenError ||
        error instanceof TokenExpiredError ||
        error instanceof NotBeforeError
      ) return res.status(401).send({ ...Status[401], error })
      else return res.status(403).send(Status[403])
    }
  } else return res.status(403).send(Status[403]);
};

export default authMiddleware;
