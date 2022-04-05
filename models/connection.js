const mysql = require('mysql2/promise');
// https://stackoverflow.com/questions/46200729/er-access-denied-error-access-denied-for-user-localhost-using-password-n
require('dotenv').config(); // Solving Error: Access denied for user ''@'localhost' (using password: NO)

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: 'StoreManager',
});

module.exports = connection;
