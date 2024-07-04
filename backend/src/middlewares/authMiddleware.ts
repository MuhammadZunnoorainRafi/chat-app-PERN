import { NextFunction, Request, Response } from 'express';
import pool from '../lib/db';
import jwt, { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user: { id: string; name: string; email: string };
    }
  }
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies['auth_token'];
  if (!token) {
    return res.status(400).json({ message: 'Token not found' });
  }

  const db = await pool.connect();
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    const userId = (decoded as JwtPayload).userId;
    const { rows: user } = await db.query(
      `SELECT id,name,email FROM users WHERE id = $1`,
      [userId]
    );

    if (!user[0]) {
      return res
        .status(400)
        .json({ message: 'User not exists, so Not Authorized' });
    }

    req.user = user[0];
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Unauthorized' });
  } finally {
    db.release();
  }
};
