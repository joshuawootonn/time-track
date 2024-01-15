module.exports = {
  db: {
    host: process.env.SQL_HOST,
    port: process.env.SQL_PORT,
    database: process.env.SQL_DATABASE,
    password: process.env.SQL_PASSWORD,
    name: 'db',
    user: process.env.SQL_USER,
    connector: 'mysql',
  },
}
