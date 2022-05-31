//Add customer to database
let express = require("express");
let bodyParser = require("body-parser");
let router = express.Router();
let connection = require("../mysql/database");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post("/api/addCustomer", urlencodedParser, (req, res) => {
  let name = req.body.name;
  let email = req.body.email;

  return addCustomer(name, email, (err) => {
    if (err) throw console.log(err);
    res.send("Done");
    console.log("Added");
  });
});

module.exports = router;

function addCustomer(name, email) {
  let sqlQuery = `INSERT INTO timetable.customers (Name, Email) values('${name}', '${email}')`;

  connection.query(sqlQuery, (err) => {
    if (err) {
      console.log(err);
    }
  });
}
