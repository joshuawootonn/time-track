module.exports = {
  db: {
    host: 'localhost',
    port: 3306,
    database: process.env.database || 'time-track',
    password: process.env.password || 'root',
    name: 'db',
    user: process.env.user || 'root',
    connector: 'mysql',
  },
};
