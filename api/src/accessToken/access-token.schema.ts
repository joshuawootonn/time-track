import {
  datetime,
  int,
  mysqlTable,
  text,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/mysql-core'

export const accessToken = mysqlTable(
  'AccessToken',
  {
    id: varchar('id', { length: 255 }).primaryKey().notNull(),
    scopes: text('scopes'),
    created: datetime('created'),
    ttl: int('ttl'),
    userId: int('userId'),
  },
  (accessToken) => ({
    idIndex: uniqueIndex('Primary').on(accessToken.id),
  }),
)
