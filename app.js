const express = require('express');

const dayjs = require('dayjs');
//import dayjs from 'dayjs' // ES 2015
dayjs().format()

var weekday = require('dayjs/plugin/weekday')

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to My Express App</h1>
    <p>Use the following links to navigate to different routes:</p>
    <ul>
      <li><a href="/api/dates/today">Today's Date</a></li>
      <li><a href="/api/dates/tomorrow">Tomorrow's Date</a></li>
      <li><a href="/api/dates/yesterday">Yesterday's Date</a></li>
      <li><a href="/api/day-of-week/2024/1/23">Day of the Week for a Specific Date</a></li>
      <li><a href="/api/current-time">Current Time</a></li>
      <li><a href="/api/current-time?format=12">Current Time in 12-hour Format</a></li>
      <li><a href="/api/timestamp">Current Timestamp in Milliseconds</a></li>
    </ul>
  `);
});


// Returns the current date in the format Tuesday Jan 16, 2024
app.get('/api/dates/today', (req, res) => {

    const currentDate = dayjs().format("dddd MMM DD, YYYY");
  
    res.status(200).json({ "Current date": currentDate });
  });


// Returns the date of the next day in the format Wednesday Jan 17, 2024
app.get('/api/dates/tomorrow', (req, res) => {

    const dateTomorrow = dayjs().add(1, "day").format("dddd MMM DD, YYYY");
  
    res.status(200).json({ "Tomorrow's date": dateTomorrow });
  });


// Returns the date of the previous day in the format Monday Jan 15, 2024
app.get('/api/dates/yesterday', (req, res) => {

    const dateYesterday = dayjs().subtract(1, "day").format("dddd MMM DD, YYYY");
  
    res.status(200).json({ "Yesterday's date": dateYesterday });
  });


// Returns the day of the week for the date provided in the URL as a parameter 
// e.g. /api/day-of-week/2024/1/16
app.get('/api/day-of-week/:year/:month/:day', (req, res) => {

    const year = req.params.year;
    // console.log(`"Year:" ${year}`)

    const month = req.params.month;
    // console.log(`"Month:" ${month}`)

    const day = req.params.day;
    // console.log(`"Day:" ${day}`)
    
    const date = `${year}-${month}-${day}`;
    // console.log(`"Input date:" ${date}`)

    const dayOfTheWeek = dayjs(date);
    // console.log(`"Date interpreted by dayjs:" ${dayOfTheWeek}`)
  
    res.status(200).json({ "day of the week": dayOfTheWeek.format("dddd ") });
  });


// Returns the current time in the format 19:20:30. This endpoint accepts a query parameter 
// called format that can be used to change the format of the time. 
// For example, /api/current-time?format=12 should return the time in the format 7:20:30 PM. 
// The default format should be 24.
app.get('/api/current-time', (req, res) => {

  const timeFormat = req.query.format;

  if (timeFormat === "12") {

    const currentTime = dayjs().format("h:mm:ss A");

    res.status(200).json({ "The current time is": currentTime });

  } else if (timeFormat === "24" || timeFormat === undefined) {

    const currentTime = dayjs().format("H:mm:ss");

    res.status(200).json({ "The current time is": currentTime });
  } else {

    res.status(200).json({ "error": "Please enter format to be 12 hour or 24 hour clock " });
  }
});


// Returns the current timestamp in milliseconds. 
// This endpoint should accept a query parameter called format that can be used to change the format 
// of the timestamp. For example, /api/timestamp?format=seconds returns the timestamp in seconds. 
// The default format should be milliseconds.
app.get('/api/timestamp', (req, res) => {

  //Still need to work on this.

});


// Returns an error message if the route is not found
app.get('*', function (req, res) {
    res.status(404).json({ error: 'Not found' });
  });


// start server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
