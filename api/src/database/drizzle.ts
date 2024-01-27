import * as accessTokenSchemas from '../accessToken/access-token.schema'
import { drizzle } from 'drizzle-orm/mysql2'
import { pool } from './connection'

export const db = drizzle(pool, {
  mode: 'default',
  schema: { ...accessTokenSchemas },
})
