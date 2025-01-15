const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database(
  path.join(__dirname, "../booking_system.sqlite"),
  (err) => {
    if (err) {
      console.error("Error opening database:", err.message);
    } else {
      console.log("Database connection established.");
    }
  }
);

// Set the busy timeout to 5000 milliseconds (5 seconds)
db.run("PRAGMA busy_timeout = 10000", (err) => {
  if (err) {
    console.error("Error setting busy timeout:", err.message);
  } else {
    console.log("Busy timeout set to 5000ms");
  }
});

const PORT = 5002;

module.exports = { db, PORT };
