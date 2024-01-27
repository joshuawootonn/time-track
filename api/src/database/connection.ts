import mysql from 'mysql2/promise'
import invariant from 'tiny-invariant'
import 'dotenv/config'

invariant(
  process.env.SQL_CONNECTION_STRING,
  'SQL_CONNECTION_STRING is undefined',
)

export const pool = mysql.createPool(process.env.SQL_CONNECTION_STRING)
