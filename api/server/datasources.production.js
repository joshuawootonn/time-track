module.exports = {
  db: {
    url: process.env.SQL_CONNECTION_STRING,
    name: 'db',
    user: process.env.SQL_USER,
    connector: 'mysql',
  },
}
