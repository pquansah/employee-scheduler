var options = {
  schema: process.env.DEFAULT_SCHEMA
};
var connectionOptions = {
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
};

var pgp = require('pg-promise')(options);
var db = pgp(connectionOptions);

module.exports = db;