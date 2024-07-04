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

  db.release();
};

main()
  .then(() => console.log('Tables created successfully 🎉'.green))
  .catch((error) => {
    console.log(`${error}`.red);
    process.exit(1);
  });
