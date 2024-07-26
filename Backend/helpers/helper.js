const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "Project";
const JWT_REFRESH_KEY ="Refresh"
const connection = require("../connection/connection"); // Adjust the path as needed

//Create Users Table


// Insert User
const insertUser = async (fullname, email, mobileno, password) => {
  try {
    const hashpassword = await bcrypt.hash(password, 10);
    const query = `
      INSERT INTO users (fullname, email, mobileno, password)
      VALUES (?, ?, ?, ?)
    `;
    const [results] = await connection
      .promise()
      .query(query, [fullname, email, mobileno, hashpassword]);
    console.log("User inserted with ID:", results.insertId);
    return true;
  } catch (err) {
    console.error("Error inserting user:", err.stack);
    throw err;
  }
};

// Get User By Email
const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users WHERE email = ?";
    connection.query(query, [email], (err, results) => {
      if (err) {
        console.error("Error fetching user by email:", err.stack);
        reject(err); // Reject the promise with the error
      } else {
      console.log(results,"oooooooooooooo");
        resolve(results); // Resolve the promise with the results
      }
    });
  });
};


// Encrypt Password
const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

// Generate JWT Token
const generateToken = (payload) => {
  if (JWT_SECRET_KEY) {
    const token = jwt.sign({ payload }, JWT_SECRET_KEY, {
      expiresIn: "2d",
    });
    return token;
  } else {
    throw new Error("JWT Token is undefined");
  }
};

const generateToken1 = (payload) => {
  if (JWT_SECRET_KEY) {
    const token = jwt.sign({ payload }, JWT_REFRESH_KEY, {
      expiresIn: "2d",
    });
    return token;
  } else {
    throw new Error("JWT Token is undefined");
  }
};

// Compare Password
const comparePassword = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

const verifyToken = (token) => {
    if (JWT_SECRET_KEY) {
      const userId = jwt.verify(token,JWT_SECRET_KEY);
      return userId;
    }
    return undefined;
  };




// View Students
const viewProfile = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users";
    connection.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching students:", err.stack);
        reject(err);
      } else {
        console.log(results, "4444444444");
        resolve(results);
      }
    });
  });
};


// Delete Student

const editStudent = (id, fullname, email, mobileno) => {
  console.log("Input parameters:", { id, fullname, email, mobileno });

  return new Promise((resolve, reject) => {
    const query =
      "UPDATE users SET fullname = ?, email = ?, mobileno = ? WHERE id = ?";

    connection.query(query, [fullname, email, mobileno, id], (err, results) => {
      if (err) {
        console.error("Error updating student:", err.stack);
        reject(err);
      } else {
        console.log("Update results:", results);
        resolve(results);
      }
    });
  });
};



module.exports = {
  insertUser,
  getUserByEmail,
  encryptPassword,
  generateToken,
  verifyToken,
  generateToken1,
  comparePassword,
  viewProfile,
  editStudent,
};
