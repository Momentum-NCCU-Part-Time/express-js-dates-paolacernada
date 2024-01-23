const express = require('express');

const dayjs = require('dayjs');
//import dayjs from 'dayjs' // ES 2015
dayjs().format();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});


// Returns the current date in the format Tuesday Jan 16, 2024
app.get('/api/dates/today', (req, res) => {

    const currentDate = dayjs().format("dddd MMM DD, YYYY");
  
    // Send the text in a JSON object
    res.json({ "Current date": currentDate });
  });


// Returns the date of the next day in the format Wednesday Jan 17, 2024
app.get('/api/dates/tomorrow', (req, res) => {

    const dateTomorrow = dayjs().add(1, "day").format("dddd MMM DD, YYYY");
  
    // Send the text in a JSON object
    res.json({ "Tomorrow's date": dateTomorrow });
  });


// Returns the date of the previous day in the format Monday Jan 15, 2024
app.get('/api/dates/yesterday', (req, res) => {

    const dateYesterday = dayjs().subtract(1, "day").format("dddd MMM DD, YYYY");
  
    // Send the text in a JSON object
    res.json({ "Yesterday's date": dateYesterday });
  });


// Returns the day of the week for the date provided in the URL as a parameter 
// e.g. /api/day-of-week/2024/1/16
app.get('/api/day-of-week/:year/:month/:day', (req, res) => {

    const year = req.params.year;

    // The month index needs to be adjusted as get or set for the month accepts numbers from 0 to 11
    const month = req.params.month - 1;

    const day = req.params.day;

    // Create a new object for the date
    const date = dayjs(new Date(year, month, day));

    const dayOfTheWeek = date.format("dddd");
  
    // Send the text in a JSON object
    res.json({ "day of the week": dayOfTheWeek });
  });


// Returns an error message if the route is not found
app.get('*', function (req, res) {
    res.status(404).json({ error: 'Not found' });
  })


// start server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

