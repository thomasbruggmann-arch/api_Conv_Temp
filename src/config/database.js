import mysql from 'mysql2/promise'
import { configDotenv } from 'dotenv'

configDotenv()

export const database = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS ?? '',
  database: process.env.DB_NAME || 'conversao_temperaturas',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})
