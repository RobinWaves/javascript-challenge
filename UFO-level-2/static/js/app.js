// from data.js
var tableData = data;

// Get a reference to the table body
var tbody = d3.select("tbody");

// Append a table to index.html add all rows of data for each ufo sighting
data.forEach(sighting => {
    var row = tbody.append("tr");
    Object.entries(sighting).forEach(([key, value]) => row.append("td").text(value));
});
//----------------------------------------------------------------------------------------//
// Select the button
var button = d3.select("#button");
// Select the form
var form = d3.select("#form");

// Create event handlers 
button.on("click", filterDate);
form.on("submit",filterDate);

// Event handler function for the form
function filterDate() {
    // Prevent the page from refreshing
    d3.event.preventDefault();
    // Select the input element and get the raw HTML node
    var inputElement = d3.select("#datetime");
    // Get the value property of the input element
    var inputValue = inputElement.property("value");

    var filteredData = tableData.filter(sighting => sighting.datetime === inputValue);

    deleteTableBody();

    // Append a filtered table to index.html adding filtered datetime ufo sightings
    filteredData.forEach(sighting => {
        var row = tbody.append("tr");
        Object.entries(sighting).forEach(([key, value]) => row.append("td").text(value));
    });    
};
// Clears table body to append new rows
function deleteTableBody() {
    tbody.selectAll("tr")
        .remove()
}