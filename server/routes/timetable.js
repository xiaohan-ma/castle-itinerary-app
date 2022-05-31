// Bus timetable Results
let express = require("express");
let bodyParser = require("body-parser");
let router = express.Router();
let connection = require("../mysql/database");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post("/api/timetable", urlencodedParser, function (req, res) {
  let date = req.body.day;
  let day = getDay(date);
  let time = req.body.time;
  let castle = req.body.castle;

  return queryBusTimetableInfo(day, time, castle, (err, data) => {
    if (err) return res.send(400);
    console.log("Post request completed");
    res.setHeader("Content-Type", "application/json");
    let resString = JSON.stringify(data.res);
    //console.log(resString);
    let resJSON = JSON.parse(resString);
    //console.log(resJSON);
    let finalJSON = {
      busOutboundJSON: resJSON[0].busOutbound,
      busReturnJSON: resJSON[1].busReturn,
    };
    console.log(finalJSON);
    res.send(finalJSON);
  });
});

module.exports = router;

async function queryBusTimetableInfo(day, time, castle, callback) {
  //If statement to check the input castle
  //Allow the correct SQL Query to be invoked
  if (castle == "Alnwick Castle" || castle == "Auckland Castle") {
    try {
      const response = await Promise.all([
        queryOutboundInfo1(day, time, castle),
        queryReturnInfo1(day, time, castle),
      ]);
      return callback(null, {
        res: response,
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const response = await Promise.all([
        queryOutboundInfo2(day, time, castle),
        queryReturnInfo2(day, time, castle),
      ]);
      return callback(null, {
        res: response,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

//Bus SQL query outbound for Alnwick Castle and Auckland Castle
let queryOutboundInfo1 = function (day, time, castle) {
  let sqlQuery = `SELECT b2.ScheduleID,'Journey' as TYPE ,b.RouteName ,b.DepartureStation ,b2.DepartureTime ,b.Destination ,b2.ArrivalTime 

    , TIMEDIFF(b2.ArrivalTime,b2.DepartureTime) as 'Duration', 

    b3.LineFare  , b3.LineOperator 

    from timetable.busroutes b , timetable.busrouteschedule b2 , timetable.busline b3  

    WHERE b.Destination  = (SELECT c.NearestBusStation  from timetable.castles c  

    WHERE c.Name ='${castle}') and b.RouteID  = b2.BusRouteID and b2.OperationDay ='${day}' and  

    b.RouteName = b3.LineName  

     having b2.DepartureTime  >= '${time}' and b2.ArrivalTime <= (SELECT DISTINCT c2.EndTime  from timetable.castles c , timetable.castleschedule c2  

WHERE c.castleID = c2.CastleID and c.Name ='${castle}'and c2.status=1)order by b2.DepartureTime ,b2.Duration limit 1`;

  return new Promise((resolve, reject) => {
    connection.query(sqlQuery, (error, results) => {
      if (error) {
        reject();
        console.log(error);
      } else {
        resolve({ busOutbound: results });
        console.log(results);
      }
    });
  });
};

//Bus SQL query return for Alnwick Castle and Auckland Castle
let queryReturnInfo1 = function (day, time, castle) {
  let sqlQuery = `SELECT b2.ScheduleID,'Return' as TYPE ,b.RouteName ,b.DepartureStation ,b2.DepartureTime ,b.Destination ,b2.ArrivalTime ,  

    TIMEDIFF(b2.ArrivalTime,b2.DepartureTime) as 'Duration', 

    b3.LineFare  , b3.LineOperator  

    from timetable.busroutes b , timetable.busrouteschedule b2 , timetable.busline b3  

    WHERE b.DepartureStation = (SELECT c.NearestBusStation  from timetable.castles c  

    WHERE c.Name ='${castle}') and b.RouteID  = b2.BusRouteID and b2.OperationDay ='${day}' and  

    b.RouteName = b3.LineName  

    HAVING b2.DepartureTime >= ADDTIME('${time}','04:00:00') limit 1`;

  return new Promise((resolve, reject) => {
    connection.query(sqlQuery, (error, results) => {
      if (error) {
        reject();
        console.log(error);
      } else {
        resolve({ busReturn: results });
      }
    });
  });
};

//Bus SQL query outbound for Bamburgh Castle and Barnard Castle
let queryOutboundInfo2 = function (day, time, castle) {
  let sqlQuery = `SELECT b2.ScheduleID,'Journey' as TYPE ,b.RouteName ,b.DepartureStation,b2.DepartureTime ,b.Destination as 'Exchange Station' ,b2.ArrivalTime,
  b3.RouteName as 'RouteName2' ,b3.DepartureStation as 'DepartureStation2' ,b4.DepartureTime as 'DepartureTime2' ,b3.Destination as 'Final Destination' ,b4.ArrivalTime as 'ArrivalTime2',
  TIMEDIFF(b4.ArrivalTime,b2.DepartureTime) as 'Total Duration' ,
  (SELECT b5.LineFare  from timetable.busline b5 WHERE b.RouteName = b5.LineName) as 'BusFare1',
  (SELECT b6.LineFare  from timetable.busline b6 WHERE b3.RouteName=b6.LineName) as 'BusFare2',
  (SELECT b5.LineOperator  from timetable.busline b5 WHERE b.RouteName = b5.LineName) as 'Operator1',
  (SELECT b6.LineOperator  from timetable.busline b6 WHERE b3.RouteName = b6.LineName) as 'Operator2',b4.ScheduleID as 'ScheduleID2'
  from
  timetable.busroutes b , timetable.busrouteschedule b2 ,timetable.busroutes b3 ,timetable.busrouteschedule b4 
  WHERE b.RouteID = b2.BusRouteID and b3.RouteID = b4.BusRouteID and b.ReturnDirection =0 and b.Direct =0
  and b2.OperationDay = b4.OperationDay and b2.OperationDay ='${day}'  and b3.ReturnDirection =0 and b3.Direct =0
  and b3.DepartureStation = b.Destination and b3.Destination = (SELECT c.NearestBusStation  from timetable.castles c 
  WHERE c.Name = '${castle}') 
  HAVING TIMEDIFF(b4.DepartureTime,b2.ArrivalTime) BETWEEN '00:00:00' and '02:00:00' and b2.DepartureTime  >= '${time}'
  and b4.ArrivalTime <=(SELECT DISTINCT  c2.EndTime  from timetable.castles c , timetable.castleschedule c2 
  WHERE c.Name = '${castle}' and c.castleID =c2.CastleID )
  order by  b2.DepartureTime  ,TIMEDIFF(b4.DepartureTime,b2.ArrivalTime) ASC limit 1`;

  return new Promise((resolve, reject) => {
    connection.query(sqlQuery, (error, results) => {
      if (error) {
        reject();
        console.log(error);
      } else {
        resolve({ busOutbound: results });
      }
    });
  });
};

//Bus SQL Query return for Bamburgh Castle and Barnard Castle
let queryReturnInfo2 = function (day, time, castle) {
  let sqlQuery = `SELECT b2.ScheduleID, 'Return' as Type ,b.RouteName ,b.DepartureStation,b2.DepartureTime ,b.Destination as 'Exchange Station' ,b2.ArrivalTime,
  b3.RouteName as 'RouteName2' ,b3.DepartureStation as 'DepartureStation2' ,b4.DepartureTime as 'DepartureTime2' ,b3.Destination as 'Final Destination' ,b4.ArrivalTime  as 'ArrivalTime2',
  TIMEDIFF(b4.ArrivalTime,b2.DepartureTime) as 'Total Duration' ,
  (SELECT b5.LineFare  from timetable.busline b5 WHERE b.RouteName = b5.LineName) as 'BusFare1',
  (SELECT b6.LineFare  from timetable.busline b6 WHERE b3.RouteName=b6.LineName) as 'BusFare2',
  (SELECT b5.LineOperator  from timetable.busline b5 WHERE b.RouteName = b5.LineName) as 'Operator1',
  (SELECT b6.LineOperator  from timetable.busline b6 WHERE b3.RouteName = b6.LineName) as 'Operator2',b4.ScheduleID as 'ScheduleID2'
  from
  timetable.busroutes b , timetable.busrouteschedule b2 ,timetable.busroutes b3 ,timetable.busrouteschedule b4 
  WHERE b.RouteID = b2.BusRouteID and b3.RouteID = b4.BusRouteID and b.ReturnDirection =1 and b.Direct =0
  and b2.OperationDay = b4.OperationDay and b2.OperationDay ='${day}'  and b3.ReturnDirection =1 and b3.Direct =0
  and b.Destination = b3.DepartureStation  and b.DepartureStation  = (SELECT c.NearestBusStation  from timetable.castles c 
  WHERE c.Name = '${castle}') 
  HAVING b2.DepartureTime >= ADDTIME('${time}','04:00:00') and b4.DepartureTime >=b2.ArrivalTime 
  order by  b2.DepartureTime  ,TIMEDIFF(b4.ArrivalTime,b2.DepartureTime) ASC limit 1`;

  return new Promise((resolve, reject) => {
    connection.query(sqlQuery, (error, results) => {
      if (error) {
        reject();
        console.log(error);
      } else {
        resolve({ busReturn: results });
      }
    });
  });
};

//Function to change date input into the weekday options accepted by the database
//Changes into 'Monday-Friday', 'Saturday', 'Sunday'
function getDay(date) {
  let d = new Date(date);
  let options = { weekday: "long" };
  let weekday = new Intl.DateTimeFormat("en-UK", options).format(d);
  if (weekday == "Saturday" || weekday == "Sunday") {
    return weekday;
  } else {
    let weekday = "Monday-Friday";
    return weekday;
  }
}
