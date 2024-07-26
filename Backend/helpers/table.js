// initialize.js
const connection = require("../connection/connection"); // Adjust the path as needed



const createUsersTable = () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      fullname VARCHAR(100) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      mobileno BIGINT NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
    )
  `;

  return new Promise((resolve, reject) => {
    connection.query(createTableQuery, (err, results) => {
      if (err) {
        console.error("Error creating users table:", err.stack);
        reject(err);
      } else {
        console.log("Users table created.");
        resolve();
      }
    });
  });
};



const initialize = async () => {
  try {
    await createUsersTable();
    console.log("Database initialization complete.");
  } catch (error) {
    console.error("Database initialization failed:", error);
  }
};

module.exports = initialize;
