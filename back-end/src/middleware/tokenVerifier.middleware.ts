import { NextFunction, Request, Response } from 'express';
import jwt, { decode } from 'jsonwebtoken';
import { AppError } from '../errors/AppError';

const tokenVerifierMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  const token = authorization?.split(' ')[1];

  if (!token) {
    throw new AppError('Token is either expired or invalid', 401);
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    (error: any, decoded: any) => {
      console.log(error);

      if (error) {
        throw new AppError('Token is either expired or invalid', 401);
      }

      req.user = {
        userEmail: decoded.email,
      };

      next();
    }
  );
};

export default tokenVerifierMiddleware;
