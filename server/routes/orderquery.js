//Query booking reference
let express = require("express");
let bodyParser = require("body-parser");
let router = express.Router();
let connection = require("../mysql/database");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post("/api/orderquery", urlencodedParser, (req, res) => {
  let referenceNo = req.body.referenceNo;
  let email = req.body.email;

  return orderQuerySearch(referenceNo, email, (err, results) => {
    if (err) return res.send(400);
    res.setHeader("Content-Type", "application/json");
    console.log("Post request completed");
    console.log(results);
    res.send(results);
  });
});

module.exports = router;

function orderQuerySearch(referenceNo, email, callback) {
  let sqlQuery = `SELECT * FROM timetable.orders o join timetable.customers c on o.CustomerEmail = c.Email WHERE o.OrderID ='${referenceNo}' and c.Email = '${email}'`;

  connection.query(sqlQuery, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      callback(null, {
        outbound: results[0].JourneyInfo,
        return: results[0].ReturnInfo,
        orderDetails: results[0],
      });
    }
  });
}
