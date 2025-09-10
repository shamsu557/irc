const mysql = require('mysql');

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'mysql-sharu557.alwaysdata.net',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'sharu557',
  password: process.env.DB_PASSWORD || '@Shamsu1440',
  database: process.env.DB_NAME || 'sharu557_ibadu_database'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
    throw err;
  }
  console.log('Connected to MySQL database');
});

// Export the database connection
module.exports = db;

// CREATE TABLE IF NOT EXISTS `bookings` (
//   `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
//   `name` VARCHAR(255) NOT NULL,
//   `email` VARCHAR(255) DEFAULT NULL,
//   `gender` VARCHAR(10) NOT NULL,
//   `date_of_birth` DATE NOT NULL,
//   `phone` VARCHAR(20) NOT NULL,
//   `address` TEXT NOT NULL,
//   `message` TEXT,
//   `time_sent` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
// ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;