var mysql = require("mysql2");

var connection = mysql.createConnection({
  host: "timetableapp-database.cihjyho45mz4.eu-west-2.rds.amazonaws.com",
  user: "admin",
  password: "",
  database: "",
});

connection.connect(function (err) {
  if (err) {
    console.error("Connection error: " + err.stack);
    return;
  }
  console.log("Connected as thread id: " + connection.threadId);
});

module.exports = connection;
