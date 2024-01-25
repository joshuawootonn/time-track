console.log(
  'Loopback 3 loaded with connection string: ',
  process.env.SQL_CONNECTION_STRING,
)
module.exports = {
  db: {
    url: process.env.SQL_CONNECTION_STRING,
    name: 'db',
    connector: 'mysql',
  },
}
