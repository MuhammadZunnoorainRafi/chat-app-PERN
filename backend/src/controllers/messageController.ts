import { Request, Response } from 'express';
import pool from '../lib/db';

export const sendMessageController = async (req: Request, res: Response) => {
  const { message } = req.body;
  const { id: receiverId } = req.params;
  const senderId = req.user.id;

  if (!message) {
    return res.status(400).json({ message: 'Message is required' });
  }

  const db = await pool.connect();

  try {
    let conversation = await db.query(
      `SELECT * FROM conversations WHERE participentsIds @> $1 AND participentsIds <@ $1`,
      [[senderId, receiverId]]
    );

    if (!conversation.rows[0]) {
      conversation = await db.query(
        `INSERT INTO conversations(participentsIds) VALUES ($1) RETURNING id`,
        [[senderId, receiverId]]
      );
    }

    const newMessage = await db.query(
      `INSERT INTO messages(message,conversationId,senderId) VALUES ($1,$2,$3) RETURNING *`,
      [message, conversation.rows[0].id, senderId]
    );

    if (!newMessage.rows[0]) {
      return res.status(400).json({ message: 'Error while sending message' });
    }

    // TODO: Socket.io will go here

    res.status(201).json({ message: newMessage.rows[0] });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: 'Something went wrong while creating conversation' });
  } finally {
    db.release();
  }
};

export const getMessageController = async (req: Request, res: Response) => {
  const { id: userToChatId } = req.params;
  const senderId = req.user.id;

  const db = await pool.connect();

  try {
    const { rows: conversation } = await db.query(
      `SELECT * FROM conversations WHERE participentsIds @> $1 AND participentsIds <@ $1`,
      [[senderId, userToChatId]]
    );
    if (!conversation[0]) {
      return res.status(400).json({ message: 'Conversation not found' });
    }

    const { rows: allMessages } = await db.query(
      `SELECT * FROM messages WHERE conversationId = $1 ORDER BY created_at ASC`,
      [conversation[0].id]
    );

    if (!allMessages[0]) {
      res.status(200).json([]);
    }

    res.status(200).json(allMessages);
  } catch (error) {
  } finally {
    db.release();
  }
};

export const getUsersForSidebarController = async (
  req: Request,
  res: Response
) => {};
