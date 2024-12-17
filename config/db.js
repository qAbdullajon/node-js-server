const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  ports: process.env.DB_PORT,
});

module.exports = pool;
