const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

const timetable = require("./routes/timetable");
const orderquery = require("./routes/orderquery");
const addcustomer = require("./routes/addCustomer");
const addorder = require("./routes/addOrder");

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());

app.use(timetable);
app.use(orderquery);
app.use(addcustomer);
app.use(addorder);

app.listen(3001, () => console.log("Server running on localhost:3001"));
