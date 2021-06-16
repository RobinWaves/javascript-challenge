// from data.js
var tableData = data;

// Append a table to index.html add new rows of data for each ufo sighting
// Column for date/time, city, state, coutnry, shape and comment // Array of Dictionaries

//datetime: "1/1/2010",
//city: "benton",
//state: "ar",
//country: "us",
//shape: "circle",
//durationMinutes: "5 mins.",
//comments: "4 bright green circles high in the sky going in circles then one bright green light at my front door."

tableData.forEach(sighting => { var row = tbody.append("tr");
    Object.entries(sighting).forEach([key, value]);
    row.append("td").text(value);
});