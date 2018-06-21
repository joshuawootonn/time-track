module.exports = {
  db: {
    host: "127.0.0.1",
    port: process.env.SQL_PORT,
    database: process.env.SQL_DATABASE,
    password: process.env.SQL_PASSWORD,
    name: "db",
    user: process.env.SQL_USER,
    connector: "mysql",
    socketPath: "/cloudsql/" + process.env.INSTANCE_CONNECTION_NAME    
  }
}