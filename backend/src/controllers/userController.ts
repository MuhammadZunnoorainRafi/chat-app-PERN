import { Request, Response } from 'express';
import { userRegSchema } from '../lib/schema';
import pool from '../lib/db';
import bcrypt from 'bcryptjs';
import { genCookieToken } from '../lib/utils';

export const userRegController = async (req: Request, res: Response) => {
  const validations = userRegSchema.safeParse(req.body);

  if (!validations.success) {
    return res
      .status(400)
      .json({ error: validations.error.flatten().fieldErrors });
  }

  const { name, email, password } = validations.data;

  const db = await pool.connect();
  try {
    const { rows: userExists } = await db.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );
    if (userExists[0]) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const queryData = {
      name,
      email,
      password: hashedPassword,
    };

    const { rows: newUser } = await db.query(
      `INSERT INTO users(name,email,password) VALUES ($1,$2,$3) RETURNING *`,
      Object.values(queryData)
    );

    if (!newUser[0]) {
      return res.status(400).json({ message: 'User not created' });
    }

    genCookieToken(newUser[0].id, res);
    res.status(201).json({ user: newUser[0] });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: 'Something went wrong while Registering user' });
  } finally {
    db.release();
  }
};
