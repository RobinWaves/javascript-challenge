// from data.js
var tableData = data;

// Get a reference to the table
//var table = d3.select("table");
// Get a reference to the table body
var tbody = d3.select("tbody");

// Use D3 to set the table class to `table table-striped`
//table.attr("class", "table table-striped");

console.log(tableData);

// Append a table to index.html add new rows of data for each ufo sighting
data.forEach(sighting => {
    var row = tbody.append("tr");
    Object.entries(sighting).forEach(([key, value]) => row.append("td").text(value));
});