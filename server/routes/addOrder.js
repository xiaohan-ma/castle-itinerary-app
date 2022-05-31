//Add order to database
let express = require("express");
let bodyParser = require("body-parser");
let router = express.Router();
let connection = require("../mysql/database");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post("/api/addOrder", urlencodedParser, (req, res) => {
  let email = req.body.email;
  let itineraryDate = req.body.itineraryDate;
  let totalCost = req.body.totalCost;
  let journeyInfo = req.body.journeyInfo;
  let returnInfo = req.body.returnInfo;
  let orderDate = generateOrderDate();
  let castleName = req.body.castleName;
  let quantity = req.body.quantity;

  return addOrder(
    email,
    itineraryDate,
    totalCost,
    journeyInfo,
    returnInfo,
    orderDate,
    castleName,
    quantity,
    (err, data) => {
      if (err) throw res.send(400);
      console.log("Post request completed");
      res.setHeader("Content-Type", "application/json");
      let resString = JSON.stringify(data.res);
      //console.log(resString);
      let resJSON = JSON.parse(resString);
      console.log(resJSON);
      res.send(resJSON);
    }
  );
});

module.exports = router;

async function addOrder(
  email,
  itineraryDate,
  totalCost,
  journeyInfo,
  returnInfo,
  orderDate,
  castleName,
  quantity,
  callback
) {
  try {
    await addOrderTable(
      email,
      itineraryDate,
      totalCost,
      journeyInfo,
      returnInfo,
      orderDate,
      castleName,
      quantity
    );
    const response = await getReferenceNum(email, orderDate);
    return callback(null, {
      res: response,
    });
  } catch (error) {
    console.log(error);
  }
}

let addOrderTable = function (
  email,
  itineraryDate,
  totalCost,
  journeyInfo,
  returnInfo,
  orderDate,
  castleName,
  quantity
) {
  let sqlQuery = `INSERT into timetable.orders (CustomerEmail, ItineraryDate, TotalCost, JourneyInfo, ReturnInfo, OrderDate, CastleName, quantity) values('${email}', '${itineraryDate}', '${totalCost}', '${journeyInfo}', '${returnInfo}', '${orderDate}', '${castleName}', '${quantity}')`;

  return new Promise((resolve, reject) => {
    connection.query(sqlQuery, (err) => {
      if (err) {
        reject();
        console.log(err);
      } else {
        resolve();
        console.log("New order added");
      }
    });
  });
};

let getReferenceNum = function (email, orderDate) {
  let sqlQuery = `SELECT OrderID FROM timetable.orders o WHERE o.CustomerEmail = '${email}' AND o.OrderDate = '${orderDate}'`;

  return new Promise((resolve, reject) => {
    connection.query(sqlQuery, (err, results) => {
      if (err) {
        reject();
        console.log(err);
      } else {
        resolve({ referenceNum: results });
      }
    });
  });
};

function generateOrderDate() {
  let today = new Date();
  let date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  return date;
}
