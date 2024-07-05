const { Pool } = require('pg');
require('colors');

const createUserTable = async (db) => {
  await db.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
  await db.query(`CREATE TABLE IF NOT EXISTS users(
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
        )`);
};

const createConversationTable = async (db) => {
  await db.query(`CREATE TABLE IF NOT EXISTS conversations(
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    participentsIds TEXT[] NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
    )`);
};

const createMessageTable = async (db) => {
  await db.query(`CREATE TABLE IF NOT EXISTS messages(
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    conversationId UUID NOT NULL,
    senderId UUID NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (conversationId) REFERENCES conversations(id),
    FOREIGN KEY (senderId) REFERENCES users(id) 
    )`);
};

const main = async () => {
  const pool = new Pool({
    database: process.env.DATABASE_NAME,
    host: process.env.HOST_NAME,
    port: +process.env.PORT_NUMBER,
    user: process.env.USER_NAME,
    password: process.env.DATABASE_PASSWORD,
  });

  const db = await pool.connect();

  await createUserTable(db);
  await createConversationTable(db);
  await createMessageTable(db);

  db.release();
};

main()
  .then(() => console.log('Tables created successfully 🎉'.green))
  .catch((error) => {
    console.log(`${error}`.red);
    process.exit(1);
  });
