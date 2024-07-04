import { Pool } from 'pg';

const pool = new Pool({
  database: process.env.DATABASE_NAME,
  host: process.env.HOST_NAME,
  port: +process.env.PORT_NUMBER!,
  user: process.env.USER_NAME,
  password: process.env.DATABASE_PASSWORD,
});

export default pool;
